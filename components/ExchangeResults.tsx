import { ALL_CURRENCIES } from "@/lib/currencies";
import CurrencyResultRow from "./CurrencyResultRow";

interface ExchangeResultsProps {
  conversions: Record<string, number>;
  selectedCode: string;
  lastUpdated: string | null;
}

export default function ExchangeResults({
  conversions,
  selectedCode,
  lastUpdated,
}: ExchangeResultsProps) {
  const targetCurrencies = ALL_CURRENCIES.filter((c) => c.code !== selectedCode);

  return (
    <div className="bg-[#161B22] rounded-2xl px-5 pb-2">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <p className="text-[#8B949E] text-xs font-semibold tracking-widest">RESULTADOS</p>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#21262D]">
        {targetCurrencies.map((currency) => (
          <CurrencyResultRow
            key={currency.code}
            currency={currency}
            convertedAmount={conversions[currency.code] ?? 0}
          />
        ))}
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <p className="text-right text-[10px] text-[#4B5563] py-3 tracking-wide">
          Actualizado: {lastUpdated}
        </p>
      )}    </div>
  );
}
