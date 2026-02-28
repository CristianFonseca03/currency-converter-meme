# Copilot Instructions

## Project Overview

A currency converter web application built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Converts between real currencies (USD, COP, MXN) via ExchangeRate-API and fictional currencies (Gansito, Balatro, Silksong) whose data is stored in a JSON file.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict)
- **Runtime**: React 19
- **Styling**: Tailwind CSS v4 (CSS-based config in `app/globals.css`, no `tailwind.config.ts`)
- **Package manager**: npm

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Architecture

```
app/
  page.tsx               # Server Component — fetches initial exchange rates, renders layout
  layout.tsx             # Root layout with dark bg
  globals.css            # Tailwind v4 config + base styles
  api/rates/route.ts     # GET Route Handler — calls ExchangeRate-API, cached 1h
components/
  ConverterClient.tsx    # "use client" root: holds amount/currency/rates state
  CurrencyInput.tsx      # Amount input + currency dropdown
  ExchangeResults.tsx    # Results list with refresh button
  CurrencyResultRow.tsx  # Single result row (icon, badge, converted amount)
data/
  fictional-currencies.json  # Edit this to add/modify fictional currencies
lib/
  currencies.ts          # Currency definitions + convertAll() logic
types/
  currency.ts            # Shared TypeScript interfaces
.env.local               # EXCHANGERATE_API_KEY (never commit)
```

## Conversion Logic

All conversions pivot through USD (`lib/currencies.ts`):
1. `amount (source) → USD` using live rates for FIAT, `usdEquivalent` field for fictional
2. `USD → target` using the same rates

## Fictional Currencies

Defined in `data/fictional-currencies.json`. Each entry:
```json
{ "code": "BAL", "name": "Balatro", "emoji": "🃏", "badge": "GAME", "usdEquivalent": 10 }
```
`usdEquivalent` = how many USD 1 unit is worth. To add a new currency, append to the JSON — no code changes needed.

## Key Conventions

- **App Router**: `page.tsx` is a Server Component that fetches data and passes it as props to `ConverterClient` (client component). Avoids client-side fetch on initial render.
- **Tailwind v4**: Uses arbitrary values (`bg-[#0D1117]`, `bg-[#161B22]`) — no config file needed. All theme vars in `globals.css`.
- **Environment variables**: `EXCHANGERATE_API_KEY` in `.env.local`, no `NEXT_PUBLIC_` prefix — only read server-side.
- **Fallback rates**: `page.tsx` has hardcoded fallback rates so the app renders without an API key (useful during development).
- **Badge styling**: `CurrencyResultRow.tsx` has a `BADGE_STYLES` map — add entries there when adding new badge types.
- **JSON imports**: `tsconfig.json` has `resolveJsonModule: true` — `lib/currencies.ts` imports `data/fictional-currencies.json` directly as a typed module.
- **ExchangeRate-API**: Endpoint `https://v6.exchangerate-api.com/v6/{KEY}/latest/USD`. Response field is `conversion_rates`. Free tier: 1,500 req/month.

