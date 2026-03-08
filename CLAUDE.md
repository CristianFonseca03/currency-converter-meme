# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos de desarrollo

```bash
npm run dev       # Servidor de desarrollo en localhost:3000
npm run build     # Build de producción
npm run lint      # ESLint
npm test          # Todos los tests con Jest
npm test -- --testPathPatterns=<nombre>  # Un test específico
npm test -- --watch     # Modo watch
npm test -- --coverage  # Con reporte de cobertura
```

## Variable de entorno requerida

Crear `.env.local` con:
```
EXCHANGERATE_API_KEY=tu_clave
```
Sin esta clave, la app funciona pero las conversiones FIAT muestran 0 (fallback deliberado).

## Arquitectura

**Patrón híbrido Server + Client Component de Next.js App Router:**
- `app/page.tsx` — Server Component: obtiene tasas de ExchangeRate-API, las pasa a ConverterClient
- `app/api/rates/route.ts` — GET /api/rates (proxy a ExchangeRate-API, cachéado 1 hora)
- `components/ConverterClient.tsx` — Client Component raíz: maneja todo el estado de conversiones
- `lib/currencies.ts` — Lógica de conversión (pivote por USD: source → USD → target)
- `data/fictional-currencies.json` — Monedas ficticias editables sin tocar código

**Agregar una moneda ficticia:** solo editar `data/fictional-currencies.json` con `{ code, name, emoji, usdEquivalent }`.

## Convenciones clave

- **Alias de ruta**: usar `@/` para importar desde la raíz (ej: `@/lib/currencies`)
- **Formato de números**: `Intl.NumberFormat("en-US")` en resultados, `Intl.NumberFormat("es-MX")` en equivalencias
- **Audio**: `CurrencyInput.tsx` usa Web Audio API para reproducir sonido en cada tecla; mockear `global.AudioContext` y `global.fetch` en tests
- **TypeScript strict**: todos los tipos explícitos en `types/currency.ts`
- **Tailwind v4**: sin `tailwind.config.ts`; configuración en `app/globals.css` con valores arbitrarios
- **Dark mode**: clase `.dark` en `<html>` vía `@custom-variant dark` en `globals.css`; por defecto oscuro; `ThemeToggle.tsx` gestiona el toggle y persiste en `localStorage`

## Tests

Tests en `__tests__/` con estructura paralela al código fuente. Los tests mockean:
- `next/server` → para `api/rates.test.ts`
- `global.fetch` + `global.AudioContext` → para componentes con audio
- `process.env.EXCHANGERATE_API_KEY` → con `beforeEach`/`afterEach`

## Reglas de colaboración

- Pedir autorización explícita antes de hacer commit o push
- Responder siempre en español
