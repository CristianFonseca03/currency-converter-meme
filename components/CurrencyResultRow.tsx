import type { Currency } from "@/types/currency";

interface CurrencyResultRowProps {
  currency: Currency;
  convertedAmount: number;
}

export default function CurrencyResultRow({ currency, convertedAmount }: CurrencyResultRowProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);

  return (
    <div className="flex items-center justify-between py-5 px-2">
      {/* Left: icon + info */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-[#21262D] flex items-center justify-center text-xl flex-shrink-0">
          {currency.emoji}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">{currency.code}</span>
          </div>
          <p className="text-[#8B949E] text-xs mt-0.5">{currency.name}</p>
        </div>
      </div>

      {/* Right: amount */}
      <span
        className={`text-lg font-bold tabular-nums ${
          currency.fictional ? "text-blue-400" : "text-white"
        }`}
      >
        {formattedAmount}
      </span>
    </div>
  );
}
