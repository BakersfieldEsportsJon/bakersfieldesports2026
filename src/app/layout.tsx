import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import Script from "next/script"

import "@/app/globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bakersfield eSports Center | Gaming, Tournaments & Parties",
  description:
    "Bakersfield's premier esports venue featuring 30+ high-end gaming PCs, console stations, tournaments, birthday parties, STEM programs, and community events. Open daily in Bakersfield, CA.",
  keywords: [
    "esports",
    "gaming center",
    "Bakersfield",
    "tournaments",
    "birthday parties",
    "PC gaming",
    "console gaming",
    "STEM programs",
  ],
  authors: [{ name: "Bakersfield eSports Center" }],
  openGraph: {
    title: "Bakersfield eSports Center | Gaming, Tournaments & Parties",
    description:
      "Bakersfield's premier esports venue featuring high-end gaming PCs, console stations, tournaments, birthday parties, and community events.",
    url: "https://bakersfieldesports.com",
    siteName: "Bakersfield eSports Center",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bakersfield eSports Center - Gaming Arena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakersfield eSports Center | Gaming, Tournaments & Parties",
    description:
      "Bakersfield's premier esports venue featuring high-end gaming PCs, console stations, tournaments, birthday parties, and community events.",
    images: ["/og-image.jpg"],
    creator: "@Bak_eSports",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://bakersfieldesports.com",
  name: "Bakersfield eSports Center",
  description:
    "Premier esports and gaming venue in Bakersfield, CA offering high-end PC gaming, console stations, tournaments, birthday parties, and STEM programs.",
  url: "https://bakersfieldesports.com",
  telephone: "(661) 529-7447",
  email: "partnerships@bakersfieldesports.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7104 Golden State Hwy",
    addressLocality: "Bakersfield",
    addressRegion: "CA",
    postalCode: "93308",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.3733,
    longitude: -119.0694,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
      opens: "12:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "12:00",
      closes: "00:00",
    },
  ],
  sameAs: [
    "https://facebook.com/Bakersfield-ESports-104418741131608",
    "https://twitter.com/Bak_eSports",
    "https://instagram.com/bakersfieldesports",
    "https://tiktok.com/@bakersfieldesportscenter",
    "https://youtube.com/channel/UCZvHOMf6jzLVp4Rf3A_fd1A",
    "https://twitch.tv/bakersfieldesportscenter",
  ],
  priceRange: "$$",
  image: "/og-image.jpg",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="dark min-h-screen font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
