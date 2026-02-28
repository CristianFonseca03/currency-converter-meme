import { NextResponse } from "next/server";
import type { ExchangeRates } from "@/types/currency";

export async function GET() {
  const apiKey = process.env.EXCHANGERATE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing EXCHANGERATE_API_KEY" }, { status: 500 });
  }

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 502 });
  }

  const data = await res.json();

  if (data.result !== "success") {
    return NextResponse.json({ error: data["error-type"] ?? "Unknown error" }, { status: 502 });
  }

  const rates: ExchangeRates = {
    COP: data.conversion_rates.COP,
    MXN: data.conversion_rates.MXN,
    lastUpdated: data.time_last_update_utc,
  };

  return NextResponse.json(rates);
}
