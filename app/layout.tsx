import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Currency Converter — Meme Edition",
  description: "Convierte monedas reales y ficticias: Gansito, Balatro, Silksong y más. Gratis, sin registro.",
  openGraph: {
    title: "Currency Converter — Meme Edition",
    description: "Convierte monedas reales y ficticias: Gansito, Balatro, Silksong y más.",
    url: "https://currency-converter-meme.vercel.app/",
    siteName: "Currency Converter Meme",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Currency Converter — Meme Edition",
    description: "Convierte monedas reales y ficticias: Gansito, Balatro, Silksong y más.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1C2128] dark:text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
