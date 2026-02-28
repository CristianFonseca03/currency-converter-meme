import ConverterClient from "@/components/ConverterClient";
import type { ExchangeRates } from "@/types/currency";

async function getRates(): Promise<ExchangeRates> {
  const apiKey = process.env.EXCHANGERATE_API_KEY;

  if (!apiKey) {
    // Fallback rates for development without an API key
    return { COP: 4125.43, MXN: 17.08, lastUpdated: "N/A (no API key)" };
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
    return { COP: 4125.43, MXN: 17.08, lastUpdated: "Error fetching rates" };
  }
}

export default async function Home() {
  const initialRates = await getRates();

  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col items-center px-4 py-12">
      {/* Converter */}
      <main className="w-full max-w-lg">
        <ConverterClient initialRates={initialRates} />
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-16">
        <a
          href="https://github.com/CristianFonseca03"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4B5563] text-[10px] tracking-[0.2em] font-medium hover:text-white transition-colors"
        >
          @cristianfonseca03
        </a>
      </footer>
    </div>
  );
}

