import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  Alex_Brush,
} from "next/font/google";
import "./globals.css";
import { getSiteData } from "@/lib/data-store";
import { ThemeProvider } from "@/context/ThemeContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chá das Princesas | Encontro de Mulheres e Filhas do Rei",
  description:
    "Um evento anual cristão para mulheres, trazendo cura emocional, acolhimento, nobreza e o amor do Rei Jesus. Cada detalhe importa!",
  keywords: [
    "Chá das Princesas",
    "Edinea Barbalho",
    "Encontro de Mulheres",
    "Igreja",
    "Filhas do Rei",
    "Cura Emocional",
    "2026",
  ],
  icons: {
    icon: "/assets/logo-2026.png",
    apple: "/assets/logo-2026.png",
  },
  openGraph: {
    title: "Chá das Princesas | 2ª Edição 2026",
    description:
      "Cada detalhe importa! Um ambiente de amor, honra e cura para todas as filhas do Rei.",
    images: ["/assets/logo-2026.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d5b96",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = getSiteData();

  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${plusJakarta.variable} ${alexBrush.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#faf8f5] text-[#242b35] selection:bg-[#f0e4cf] selection:text-[#1d5b96]">
        <ThemeProvider initialData={initialData}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
