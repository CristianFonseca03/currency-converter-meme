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
    <div className="flex items-center justify-between py-4 sm:py-5 px-2 gap-2">
      {/* Left: icon + info */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#21262D] flex items-center justify-center text-xl flex-shrink-0">
          {currency.emoji}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">{currency.code}</span>
          </div>
          <p className="text-[#8B949E] text-xs mt-0.5 truncate">{currency.name}</p>
        </div>
      </div>

      {/* Right: amount */}
      <span
        className={`text-base sm:text-lg font-bold tabular-nums flex-shrink-0 ${
          currency.fictional ? "text-blue-400" : "text-white"
        }`}
      >
        {formattedAmount}
      </span>
    </div>
  );
}
