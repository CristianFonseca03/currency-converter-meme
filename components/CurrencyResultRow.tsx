import type { Currency } from "@/types/currency";
import TwemojiIcon from "@/components/TwemojiIcon";

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
    <div className="flex items-center justify-between py-3.5 sm:py-5 px-1 sm:px-2 gap-3">
      {/* Left: icon + info */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#EAEEF2] dark:bg-[#21262D] flex items-center justify-center flex-shrink-0">
          <TwemojiIcon emoji={currency.emoji} size={22} />
        </div>
        <div className="min-w-0">
          <span className="text-[#1C2128] dark:text-white font-bold text-xs sm:text-sm block">{currency.code}</span>
          <p className="text-[#57606A] dark:text-[#8B949E] text-[10px] sm:text-xs mt-0.5 truncate">{currency.name}</p>
        </div>
      </div>

      {/* Right: amount */}
      <span
        className={`text-base sm:text-lg font-bold tabular-nums flex-shrink-0 ${
          currency.fictional ? "text-blue-500 dark:text-blue-400" : "text-[#1C2128] dark:text-white"
        }`}
      >
        {formattedAmount}
      </span>
    </div>
  );
}
