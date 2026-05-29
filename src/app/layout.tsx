import type { Metadata } from "next";
import { Playfair_Display, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingElements } from "@/components/layout/FloatingElements";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shree Raj Steels | Premium Pipe Fittings & Flanges Manufacturer in India",
    template: "%s | Shree Raj Steels",
  },
  description:
    "Leading manufacturer & supplier of seamless pipes, elbows, tees, reducers, flanges & special alloy fittings. ISO 9001 + PED certified. 40+ years experience. Pan India & global delivery.",
  keywords: [
    "pipe fittings manufacturer India",
    "flanges supplier",
    "seamless pipes",
    "elbows",
    "tees",
    "reducers",
    "pipe caps",
    "special alloy fittings",
    "Navi Mumbai",
    "ISO certified",
    "PED certified",
    "stainless steel fittings",
    "nickel alloy fittings",
    "super duplex",
  ],
  authors: [{ name: "Shree Raj Steels" }],
  creator: "Shree Raj Steels",
  publisher: "Shree Raj Steels",
  metadataBase: new URL("https://www.shreerajsteels.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.shreerajsteels.com",
    siteName: "Shree Raj Steels",
    title: "Shree Raj Steels | Premium Pipe Fittings & Flanges Manufacturer",
    description:
      "Leading manufacturer & supplier of seamless pipes, elbows, tees, reducers, flanges & special alloy fittings. ISO 9001 + PED certified. 40+ years experience.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shree Raj Steels — Engineering Excellence in Every Fitting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Raj Steels | Premium Pipe Fittings & Flanges Manufacturer",
    description:
      "Leading manufacturer & supplier of seamless pipes, elbows, tees, reducers, flanges & special alloy fittings. ISO 9001 + PED certified.",
    images: ["/images/og-image.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// Schema.org Organization markup
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shree Raj Steels",
  alternateName: "SRS",
  url: "https://www.shreerajsteels.com",
  logo: "https://www.shreerajsteels.com/images/logo-gold.png",
  description:
    "Leading manufacturer & supplier of seamless pipes, elbows, tees, reducers, flanges & special alloy fittings.",
  foundingDate: "2019-08",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "408, Kamdhenu Commerz, Sector 14, Kharghar",
      addressLocality: "Navi Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "410210",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Plot 1680, 1681, 1710 & 1711, Road L-20, Kalamboli Steel Market",
      addressLocality: "Kalamboli, Raigad",
      addressRegion: "Maharashtra",
      postalCode: "410218",
      addressCountry: "IN",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-7069672923",
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-7400410762",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/shree-raj-steels",
    "https://www.instagram.com/shreerajsteels",
    "https://www.facebook.com/shreerajsteels",
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "ISO 9001:2015" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "ISO 14001:2015" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "ISO 45001:2018" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "CE-PED 2014/68/EU" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "AD2000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-montserrat)]">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingElements />
      </body>
    </html>
  );
}
