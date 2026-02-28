import type { Currency, ExchangeRates, FictionalCurrencyEntry } from "@/types/currency";
import fictionalData from "@/data/fictional-currencies.json";

const fictionalEntries = fictionalData as FictionalCurrencyEntry[];

export const REAL_CURRENCIES: Currency[] = [
  { code: "USD", name: "Dólar estadounidense", emoji: "🇺🇸", badge: "FIAT", fictional: false },
  { code: "COP", name: "Peso colombiano", emoji: "🇨🇴", badge: "FIAT", fictional: false },
  { code: "MXN", name: "Peso mexicano", emoji: "🇲🇽", badge: "FIAT", fictional: false },
];

export const FICTIONAL_CURRENCIES: Currency[] = fictionalEntries.map((c) => ({
  code: c.code,
  name: c.name,
  emoji: c.emoji,
  badge: c.badge,
  fictional: true,
  usdEquivalent: c.usdEquivalent,
}));

export const ALL_CURRENCIES: Currency[] = [...REAL_CURRENCIES, ...FICTIONAL_CURRENCIES];

/**
 * Convert `amount` of `fromCode` to every other currency.
 * All conversions pivot through USD:
 *   source → USD → target
 *
 * @param amount - The amount in the source currency
 * @param fromCode - Source currency code
 * @param rates - Live rates from ExchangeRate-API (units per 1 USD)
 * @returns Map of currencyCode → converted amount
 */
export function convertAll(
  amount: number,
  fromCode: string,
  rates: ExchangeRates
): Record<string, number> {
  const amountUSD = toUSD(amount, fromCode, rates);

  const result: Record<string, number> = {};
  for (const currency of ALL_CURRENCIES) {
    if (currency.code === fromCode) continue;
    result[currency.code] = fromUSD(amountUSD, currency.code, rates);
  }
  return result;
}

/** Convert an amount of any currency to USD */
function toUSD(amount: number, fromCode: string, rates: ExchangeRates): number {
  if (fromCode === "USD") return amount;
  if (fromCode === "COP") return amount / rates.COP;
  if (fromCode === "MXN") return amount / rates.MXN;

  const fictional = FICTIONAL_CURRENCIES.find((c) => c.code === fromCode);
  if (fictional?.usdEquivalent) return amount * fictional.usdEquivalent;

  return amount;
}

/** Convert a USD amount to any currency */
function fromUSD(amountUSD: number, toCode: string, rates: ExchangeRates): number {
  if (toCode === "USD") return amountUSD;
  if (toCode === "COP") return amountUSD * rates.COP;
  if (toCode === "MXN") return amountUSD * rates.MXN;

  const fictional = FICTIONAL_CURRENCIES.find((c) => c.code === toCode);
  if (fictional?.usdEquivalent) return amountUSD / fictional.usdEquivalent;

  return amountUSD;
}
