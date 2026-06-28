import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hotel Casa Mónica · Mompox — Siéntete como en casa",
  description:
    "Hotel Casa Mónica es una posada familiar en el corazón patrimonial de Mompox, Bolívar — UNESCO 1995. Habitaciones climatizadas, parqueadero y atención cercana detrás de la Iglesia de Santa Bárbara. Reserva directa por WhatsApp.",
  keywords: [
    "Hotel Casa Mónica",
    "Mompox",
    "Mompós",
    "Bolívar",
    "Colombia",
    "posada familiar",
    "casa hotel",
    "UNESCO Mompox",
    "Santa Bárbara",
    "albarrada",
    "Patrimonio de la Humanidad",
    "hotel económico Mompox",
  ],
  authors: [{ name: "Hotel Casa Mónica" }],
  icons: {
    icon: "/casa-monica-logo.png",
    apple: "/casa-monica-logo.png",
  },
  openGraph: {
    title: "Hotel Casa Mónica · Mompox — Siéntete como en casa",
    description:
      "Posada familiar en el corazón patrimonial de Mompox (UNESCO 1995). Detrás de la Iglesia de Santa Bárbara, a pasos de la Albarrada. Reserva directa por WhatsApp +57 300 310 0299.",
    url: "https://hotelcasamonica.com",
    siteName: "Hotel Casa Mónica",
    type: "website",
    locale: "es_CO",
    images: [{ url: "/hotel-exterior-day.png", width: 1200, height: 630, alt: "Fachada de Hotel Casa Mónica en Mompox" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Casa Mónica · Mompox",
    description: "Siéntete como en casa, en el corazón patrimonial de Mompox.",
  },
  alternates: {
    canonical: "https://hotelcasamonica.com",
    languages: { "es-CO": "/", "en-US": "/?lang=en" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${dancing.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
