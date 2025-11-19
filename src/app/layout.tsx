import type { Metadata } from "next";
import "./globals.css";
import { restaurantConfig } from "../../config/restaurant.config";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: restaurantConfig.seo.title,
  description: restaurantConfig.seo.description,
  metadataBase: new URL(restaurantConfig.seo.siteUrl),
  applicationName: restaurantConfig.name,
  keywords: restaurantConfig.seo.keywords,
  authors: [{ name: restaurantConfig.name }],
  creator: restaurantConfig.name,
  publisher: restaurantConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${restaurantConfig.name} — ${restaurantConfig.slogan}`,
    description: `${restaurantConfig.about} Réservez votre table dès maintenant!`,
    url: "/",
    siteName: restaurantConfig.name,
    type: "website",
    images: [
      {
        url: restaurantConfig.seo.ogImage,
        width: 1600,
        height: 900,
        alt: `${restaurantConfig.name} - Intérieur du restaurant`,
      },
    ],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurantConfig.name} — ${restaurantConfig.slogan}`,
    description: `${restaurantConfig.about} Réservez dès maintenant!`,
    images: [restaurantConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#C0392B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": restaurantConfig.name,
              "description": restaurantConfig.about,
              "image": "https://example.com/images/hero/restaurant-interior.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": restaurantConfig.address.split(",")[0],
                "addressLocality": "Paris",
                "postalCode": "75002",
                "addressCountry": "FR"
              },
              "telephone": restaurantConfig.phone,
              "email": restaurantConfig.email,
              "url": "https://example.com",
              "servesCuisine": "French",
              "priceRange": "$$",
              "acceptsReservations": true,
              "hasMenu": "https://example.com/#carte"
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
