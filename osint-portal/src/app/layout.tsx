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
  title: "Painel OSINT gratuito 2025",
  description:
    "Curadoria das principais ferramentas OSINT gratuitas e de uso comunitário em 2025, com filtros por maturidade e cenário de aplicação.",
  metadataBase: new URL("https://agentic-7f27ea0a.vercel.app"),
  openGraph: {
    title: "Painel OSINT gratuito 2025",
    description:
      "Descubra as melhores ferramentas OSINT gratuitas para investigações, monitoramento e jornalismo.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Painel OSINT gratuito 2025",
    description:
      "Descubra as melhores ferramentas OSINT gratuitas para investigações, monitoramento e jornalismo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
