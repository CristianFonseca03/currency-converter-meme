# Instrucciones para Copilot

## Descripción del proyecto

Aplicación web de conversión de monedas construida con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS v4**. Convierte entre monedas reales (USD, COP, MXN) mediante ExchangeRate-API y monedas ficticias (Gansito, Balatro, Silksong) cuyos datos están almacenados en un archivo JSON.

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
npm test           # Ejecutar pruebas con Jest
```

## Arquitectura

```
app/
  page.tsx               # Server Component — obtiene tasas de cambio iniciales y renderiza el layout
  layout.tsx             # Layout raíz con fondo oscuro
  globals.css            # Configuración Tailwind v4 + estilos base
  api/rates/route.ts     # GET Route Handler — llama a ExchangeRate-API, caché de 1h
components/
  ConverterClient.tsx    # Raíz "use client": maneja el estado de monto/moneda/tasas
  CurrencyInput.tsx      # Input de monto + dropdown de selección de moneda
  ExchangeResults.tsx    # Lista de resultados
  CurrencyResultRow.tsx  # Fila individual de resultado (ícono, badge, monto convertido)
data/
  fictional-currencies.json  # Editar para agregar/modificar monedas ficticias
lib/
  currencies.ts          # Definición de monedas + lógica de convertAll()
types/
  currency.ts            # Interfaces TypeScript compartidas
.env.local               # EXCHANGERATE_API_KEY (nunca hacer commit)
```

## Lógica de conversión

Todas las conversiones pasan por USD (`lib/currencies.ts`):
1. `monto (origen) → USD` usando tasas en vivo para FIAT, campo `usdEquivalent` para ficticias
2. `USD → destino` usando las mismas tasas

## Monedas ficticias

Definidas en `data/fictional-currencies.json`. Cada entrada:
```json
{ "code": "BAL", "name": "Balatro", "emoji": "🃏", "badge": "GAME", "usdEquivalent": 10 }
```
`usdEquivalent` = cuántos USD vale 1 unidad. Para agregar una moneda nueva, solo agregar al JSON — no se requieren cambios en el código.

## Convenciones clave

- **App Router**: `page.tsx` es un Server Component que obtiene datos y los pasa como props a `ConverterClient` (componente cliente). Evita el fetch en el cliente en el renderizado inicial.
- **Tailwind v4**: Usa valores arbitrarios (`bg-[#0D1117]`, `bg-[#161B22]`) — sin archivo de configuración. Todas las variables de tema en `globals.css`.
- **Variables de entorno**: `EXCHANGERATE_API_KEY` en `.env.local`, sin prefijo `NEXT_PUBLIC_` — solo se lee del lado del servidor.
- **Tasas de respaldo**: `page.tsx` tiene tasas hardcodeadas como fallback para que la app renderice sin clave de API (útil en desarrollo).
- **Estilos de badge**: `CurrencyResultRow.tsx` tiene un mapa `BADGE_STYLES` — agregar entradas ahí al añadir nuevos tipos de badge.
- **Importación de JSON**: `tsconfig.json` tiene `resolveJsonModule: true` — `lib/currencies.ts` importa `data/fictional-currencies.json` directamente como módulo tipado.
- **ExchangeRate-API**: Endpoint `https://v6.exchangerate-api.com/v6/{KEY}/latest/USD`. El campo de respuesta es `conversion_rates`. Tier gratuito: 1,500 req/mes.

## Reglas de flujo de trabajo

- **Antes de hacer cualquier `git commit` o `git push`, solicitar autorización explícita al usuario.**
- **Responder siempre en español.**
