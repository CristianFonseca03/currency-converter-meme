import { ALL_CURRENCIES, convertAll } from "@/lib/currencies";
import type { ExchangeRates } from "@/types/currency";

interface EquivalenciesProps {
  rates: ExchangeRates;
}

export default function Equivalencies({ rates }: EquivalenciesProps) {
  const usdToFiat = convertAll(1, "USD", rates);
  const currencies = ALL_CURRENCIES.filter((c) => c.code !== "USD");

  return (
    <div className="bg-[#161B22] rounded-2xl px-5 py-4">
      <p className="text-[#8B949E] text-xs font-semibold tracking-widest mb-3">
        EQUIVALENCIAS
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {currencies.map((c) => {
          const isFiat = !c.fictional;
          const value = isFiat ? usdToFiat[c.code] : (c.usdEquivalent ?? 0);
          const formatted = new Intl.NumberFormat("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value);

          return (
            <div key={c.code} className="bg-[#0D1117] rounded-xl px-3 py-2.5">
              <p className="text-[#8B949E] text-[10px] mb-1">
                {isFiat ? "1 USD →" : `1 ${c.code} →`}
              </p>
              <div className="flex items-center gap-1.5">
                <span>{c.emoji}</span>
                <span className="text-white font-bold text-sm tabular-nums">
                  {formatted}
                </span>
                <span className="text-[#8B949E] text-xs">
                  {isFiat ? c.code : "USD"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
