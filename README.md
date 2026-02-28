# Conversor de monedas meme 💵

🌐 **Demo en vivo:** [currency-converter-meme.vercel.app](https://currency-converter-meme.vercel.app/)

Conversor de monedas construido con Next.js 16, TypeScript y Tailwind CSS. Convierte entre monedas reales (USD, COP, MXN) usando la API de ExchangeRate-API, y entre monedas ficticias (Gansito, Balatro, Silksong) cuyas equivalencias están definidas en un JSON editable.

## Monedas soportadas

| Código | Nombre | Tipo |
|--------|--------|------|
| USD | Dólar estadounidense | Real |
| COP | Peso colombiano | Real |
| MXN | Peso mexicano | Real |
| GNS | Gansito 🍰 | Ficticia (= 1 USD) |
| BAL | Balatro 🃏 | Ficticia (= 10 USD) |
| SLK | Silksong 🕷️ | Ficticia (= 20 USD) |

Para agregar una nueva moneda ficticia, edita `data/fictional-currencies.json` sin tocar código.

## Configuración

1. Clona el repositorio e instala dependencias:

```bash
npm install
```

2. Crea el archivo `.env.local` con tu API key de [ExchangeRate-API](https://www.exchangerate-api.com/):

```bash
EXCHANGERATE_API_KEY=tu_api_key_aqui
```

> Sin API key el app funciona pero muestra 0 en las conversiones de monedas reales (COP, MXN).

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
npm test         # Ejecutar pruebas
```

## Despliegue en Vercel

La forma más sencilla es desplegar en [Vercel](https://vercel.com):

1. Sube el repositorio a GitHub
2. Importa el proyecto en Vercel desde [vercel.com/new](https://vercel.com/new)
3. Agrega la variable de entorno `EXCHANGERATE_API_KEY` en **Settings → Environment Variables**
4. Despliega — Vercel detecta Next.js automáticamente

## Despliegue manual

```bash
npm run build
npm run start
```

Requiere Node.js 18+. Las tasas de cambio se cachean 1 hora (`revalidate: 3600`).

---

Desarrollado por [@cristianfonseca03](https://github.com/CristianFonseca03)
