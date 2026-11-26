import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Instrument_Serif } from "next/font/google"
import { Suspense } from "react"
import { PortfolioTheme } from "@/components/portfolio-theme"
import { profile } from "@/lib/profile"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  weight: "400",
})



export const metadata: Metadata = {
  metadataBase: new URL("https://www.rajvaghela.dev"),
  title: "Raj Vaghela | AI Systems Engineer",
  description: profile.role + " at " + profile.employer + ". Full-stack development, LLM applications and data pipelines. Based in " + profile.location + ".",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Raj Vaghela | AI Systems Engineer",
    description: "Full-stack development, LLM applications and data pipelines at " + profile.employer + ". Explore my selected projects.",
    url: "/",
    siteName: "Raj Vaghela",
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Raj Vaghela | AI Systems Engineer", description: "LLM applications, data pipelines and full stack delivery." },
}

export const viewport: Viewport = {
  themeColor: [{ media: "(width < 64rem)", color: "#101116" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} antialiased`} suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
        <PortfolioTheme>
        <Suspense fallback={null}>{children}</Suspense>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Raj Vaghela",
          url: "https://www.rajvaghela.dev",
          jobTitle: profile.role,
          worksFor: { "@type": "Organization", name: profile.employer },
          sameAs: ["https://github.com/Raj-Vaghela", "https://www.linkedin.com/in/raj-vaghela/"],
          knowsAbout: ["LLM applications", "Retrieval augmented generation", "Data pipelines", "Full stack development"],
        }).replace(/</g, "\\u003c") }} />
        <Analytics />
        <SpeedInsights />
        </PortfolioTheme>
      </body>
    </html>
  )
}
