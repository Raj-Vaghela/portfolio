import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Instrument_Serif, Press_Start_2P } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  weight: "400",
})

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start",
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rajvaghela.dev"),
  title: "Raj Vaghela | AI Systems Engineer",
  description: "AI Systems Engineer at Stack8s building LLM applications, cloud pricing pipelines and full stack tools. Python, FastAPI, Next.js and Supabase. Based in Leicester, UK.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Raj Vaghela | AI Systems Engineer",
    description: "LLM applications, data pipelines and full stack delivery. Explore my work at Stack8s and selected projects.",
    url: "/",
    siteName: "Raj Vaghela",
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Raj Vaghela | AI Systems Engineer", description: "LLM applications, data pipelines and full stack delivery." },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${pressStart2P.variable} antialiased`} suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <Suspense fallback={null}>{children}</Suspense>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Raj Vaghela",
          url: "https://www.rajvaghela.dev",
          jobTitle: "AI Systems Engineer",
          worksFor: { "@type": "Organization", name: "Stack8s" },
          sameAs: ["https://github.com/Raj-Vaghela", "https://www.linkedin.com/in/raj-vaghela/"],
          knowsAbout: ["LLM applications", "Retrieval augmented generation", "Data pipelines", "Full stack development"],
        }).replace(/</g, "\\u003c") }} />
        <Analytics />
        <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
