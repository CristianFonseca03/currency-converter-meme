# Instrucciones para Copilot

## Descripción del proyecto

Conversor de monedas construido con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS v4**. Convierte entre monedas reales (USD, COP, MXN) mediante ExchangeRate-API y monedas ficticias (Gansito, Balatro, Silksong) cuyos datos están en un JSON editable.

Demo en vivo: https://currency-converter-meme.vercel.app/

## Stack

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript 5 (strict)
- **Runtime**: React 19
- **Estilos**: Tailwind CSS v4 (configuración basada en CSS en `app/globals.css`, sin `tailwind.config.ts`)
- **Gestor de paquetes**: npm

## Comandos

```bash
npm run dev        # Iniciar servidor de desarrollo (localhost:3000)
npm run build      # Build de producción
npm run start      # Iniciar servidor de producción
npm run lint       # Ejecutar ESLint
npm test           # Ejecutar todas las pruebas

# Ejecutar una sola suite de pruebas
npm test -- --testPathPatterns=CurrencyInput
npm test -- --testPathPatterns=currencies
```

## Arquitectura

```
app/
  page.tsx               # Server Component — obtiene tasas, pasa initialRates a ConverterClient
  api/rates/route.ts     # GET — llama a ExchangeRate-API, caché de 1h (revalidate: 3600)
components/
  ConverterClient.tsx    # Raíz "use client": estado de monto/moneda/tasas
  CurrencyInput.tsx      # Input de monto + dropdown + reproducción de sonido
  ExchangeResults.tsx    # Lista de resultados de conversión
  CurrencyResultRow.tsx  # Fila individual (emoji, código, monto formateado)
  Equivalencies.tsx      # Grid "1 USD → X moneda" para todas las monedas
data/
  fictional-currencies.json  # Agregar/modificar monedas ficticias aquí (sin tocar código)
lib/
  currencies.ts          # REAL_CURRENCIES, FICTIONAL_CURRENCIES, ALL_CURRENCIES, convertAll()
types/
  currency.ts            # Currency, ExchangeRates, FictionalCurrencyEntry
public/sounds/
  multhit1.mp3           # Sonido al escribir (Web Audio API con buffer precargado)
  multhit1.ogg           # Versión original (no usada en producción)
__tests__/
  lib/currencies.test.ts
  components/{CurrencyInput,CurrencyResultRow,ExchangeResults}.test.tsx
  api/rates.test.ts
```

## Lógica de conversión

Toda conversión pivota por USD (`lib/currencies.ts`):
1. `origen → USD`: FIAT usa tasas en vivo (`rates.COP`, `rates.MXN`); ficticias usan `usdEquivalent`
2. `USD → destino`: inversión de lo mismo

## Monedas ficticias

Cada entrada en `data/fictional-currencies.json`:
```json
{ "code": "BAL", "name": "Balatro", "emoji": "🃏", "usdEquivalent": 10 }
```
`usdEquivalent` = cuántos USD vale 1 unidad. Solo editar el JSON para agregar monedas.

## Convenciones clave

- **Sin API key**: `page.tsx` devuelve `{ COP: 0, MXN: 0 }` como fallback — la app renderiza pero las conversiones de FIAT muestran 0.
- **Alias `@/`**: resuelve a la raíz del proyecto (`tsconfig.json` paths + `jest.config.ts` moduleNameMapper).
- **Formato de números**: `CurrencyResultRow` usa `Intl.NumberFormat("en-US")`; `Equivalencies` usa `"es-MX"`.
- **Tailwind v4**: solo valores arbitrarios (`bg-[#0D1117]`, `bg-[#161B22]`, `text-[#8B949E]`). No hay `tailwind.config.ts`.
- **Audio**: `CurrencyInput` precarga `multhit1.mp3` con `AudioContext.decodeAudioData` al montar y reproduce con `createBufferSource` por cada tecla.
- **Tests de componentes con audio**: mockear `global.fetch` (para la carga del MP3) y `global.AudioContext` antes de renderizar `CurrencyInput`.
- **Variables de entorno**: `EXCHANGERATE_API_KEY` solo en `.env.local`, sin prefijo `NEXT_PUBLIC_` — exclusivo del servidor.
- **Despliegue**: Vercel con `EXCHANGERATE_API_KEY` en Settings → Environment Variables. Requiere Node.js 18+.

## Reglas de flujo de trabajo

- **Antes de hacer cualquier `git commit` o `git push`, solicitar autorización explícita al usuario.**
- **Responder siempre en español.**
