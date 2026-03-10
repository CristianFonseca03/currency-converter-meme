import ConverterClient from "@/components/ConverterClient";
import ThemeToggle from "@/components/ThemeToggle";
import TwemojiIcon from "@/components/TwemojiIcon";
import type { ExchangeRates } from "@/types/currency";

async function getRates(): Promise<ExchangeRates> {
  const apiKey = process.env.EXCHANGERATE_API_KEY;

  if (!apiKey) {
    // Fallback rates for development without an API key
    return { COP: 0, MXN: 0, lastUpdated: "N/A (sin API key)" };
  }

  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (data.result !== "success") throw new Error(data["error-type"]);
    return {
      COP: data.conversion_rates.COP,
      MXN: data.conversion_rates.MXN,
      lastUpdated: data.time_last_update_utc,
    };
  } catch {
    return { COP: 0, MXN: 0, lastUpdated: "Error al obtener tasas" };
  }
}

export default async function Home() {
  const initialRates = await getRates();

  return (
    <div className="min-h-screen bg-[#F6F8FA] dark:bg-[#0D1117] flex flex-col items-center px-3 sm:px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="w-full max-w-lg mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <TwemojiIcon emoji="💱" size={22} />
          </div>
          <div className="flex-1">
            <h1 className="text-[#1C2128] dark:text-white font-bold text-base sm:text-lg leading-tight">
              Currency Converter
            </h1>
            <p className="text-[#8C959F] dark:text-[#4B5563] text-[10px] sm:text-xs tracking-widest font-medium">
              MEME EDITION
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Converter */}
      <main className="w-full max-w-lg">
        <ConverterClient initialRates={initialRates} />
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-10 sm:pt-16">
        <a
          href="https://github.com/CristianFonseca03"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8C959F] dark:text-[#4B5563] text-[10px] tracking-[0.2em] font-medium hover:text-[#1C2128] dark:hover:text-white transition-colors"
        >
          @cristianfonseca03
        </a>
      </footer>
    </div>
  );
}
