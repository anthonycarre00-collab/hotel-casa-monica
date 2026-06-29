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

// === SEO Metadata ===
export const metadata: Metadata = {
  metadataBase: new URL("https://hotelcasamonica.com"),
  title: {
    default: "Hotel Casa Mónica · Mompox — Siéntete como en casa",
    template: "%s · Hotel Casa Mónica",
  },
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
  creator: "Hotel Casa Mónica",
  publisher: "Hotel Casa Mónica",
  applicationName: "Hotel Casa Mónica",
  category: "travel",
  manifest: "/manifest.json",
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
    alternateLocale: ["en_US", "pt_BR", "fr_FR"],
    images: [
      {
        url: "/hotel-exterior-day.png",
        width: 1200,
        height: 630,
        alt: "Fachada de Hotel Casa Mónica en Mompox",
      },
      {
        url: "/owners-couple.jpg",
        width: 800,
        height: 1000,
        alt: "Fredy y Mónica, dueños de Hotel Casa Mónica",
      },
      {
        url: "/mompox-river-sunset-real.jpg",
        width: 1200,
        height: 800,
        alt: "Atardecer sobre el río Magdalena en Mompox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Casa Mónica · Mompox",
    description: "Siéntete como en casa, en el corazón patrimonial de Mompox.",
    images: ["/hotel-exterior-day.png"],
  },
  alternates: {
    canonical: "https://hotelcasamonica.com",
    languages: {
      "es-CO": "/",
      "en-US": "/?lang=en",
      "pt-BR": "/?lang=pt",
      "fr-FR": "/?lang=fr",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// === JSON-LD Structured Data ===
// Schema.org Hotel markup — gives Google rich results (stars, photos, price range)
const jsonLdHotel = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Hotel Casa Mónica",
  alternateName: "Casa Mónica Mompox",
  description:
    "Posada familiar en el corazón patrimonial de Mompox (UNESCO 1995). Habitaciones climatizadas, parqueadero y atención cercana detrás de la Iglesia de Santa Bárbara.",
  url: "https://hotelcasamonica.com",
  image: [
    "https://hotelcasamonica.com/hotel-exterior-day.png",
    "https://hotelcasamonica.com/hotel-exterior-night.png",
    "https://hotelcasamonica.com/owners-couple.jpg",
  ],
  logo: "https://hotelcasamonica.com/casa-monica-logo.png",
  telephone: "+573003100299",
  email: "casamonicamompox@gmail.com",
  priceRange: "$$",
  starRating: { "@type": "Rating", ratingValue: "5" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "9.2",
    bestRating: "10",
    ratingCount: "55",
    reviewCount: "55",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle 14 #2 74",
    addressLocality: "Santa Cruz de Mompox",
    addressRegion: "Bolívar",
    postalCode: "132560",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.2365293,
    longitude: -74.4205067,
  },
  checkinTime: "15:00",
  checkoutTime: "12:00",
  currenciesAccepted: "COP, USD",
  paymentAccepted: "Cash, Credit Card",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Aire acondicionado", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parqueadero", value: true },
    { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Baño privado", value: true },
    { "@type": "LocationFeatureSpecification", name: "Ventilador de techo", value: true },
    { "@type": "LocationFeatureSpecification", name: "Atención familiar", value: true },
  ],
  availableLanguage: ["es", "en"],
  knowsAbout: [
    "Mompox",
    "Río Magdalena",
    "Filigrana momposina",
    "Ciénaga de Pijiño",
    "Semana Santa",
    "Festijazz Mompox",
  ],
};

// Schema.org WebSite markup — for sitelinks search box
const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hotel Casa Mónica",
  url: "https://hotelcasamonica.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://hotelcasamonica.com/?q={query}",
    "query-input": "required name=query",
  },
};

// Schema.org TouristDestination — Mompox as a destination
const jsonLdDestination = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Mompox",
  alternateName: "Santa Cruz de Mompox",
  description:
    "Pueblo colonial Patrimonio de la Humanidad por la UNESCO desde 1995, fundado en 1537 a orillas del río Magdalena.",
  url: "https://hotelcasamonica.com",
  touristType: ["Cultural tourism", "Heritage tourism", "River tourism"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHotel) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDestination) }}
        />
        {/* === Plausible Analytics (privacy-friendly, GDPR-compliant) ===
             To enable: 1) Sign up at plausible.io (~$9/mo) 2) Add your domain
             3) Uncomment the script below 4) Replace 'hotelcasamonica.com'
             with your actual domain. No cookie banner needed.
        <script
          defer
          data-domain="hotelcasamonica.com"
          src="https://plausible.io/js/script.js"
        />
        */}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${dancing.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
