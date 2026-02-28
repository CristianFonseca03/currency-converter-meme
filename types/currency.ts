export type BadgeType = "FIAT" | "GAME" | "SNACK" | string;

export interface Currency {
  code: string;
  name: string;
  emoji: string;
  fictional: boolean;
  /** For fictional currencies: how many USD is 1 unit worth */
  usdEquivalent?: number;
}

export interface FictionalCurrencyEntry {
  code: string;
  name: string;
  emoji: string;
  usdEquivalent: number;
}

/** Rates returned from /api/rates — all expressed as units per 1 USD */
export interface ExchangeRates {
  COP: number;
  MXN: number;
  lastUpdated: string;
}
