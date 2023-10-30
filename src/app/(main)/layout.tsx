import "./globals.css"

import { type Viewport } from 'next'

import { Montserrat } from "next/font/google"
import localFont from "next/font/local"

import reader from "@/lib/keystatic"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Script from "next/script"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
})

const reckless = localFont({
  src: [
    {
      path: "../../fonts/RecklessNeue/ttf/RecklessNeue-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/RecklessNeue/ttf/RecklessNeue-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/RecklessNeue/ttf/RecklessNeue-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-reckless",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#362009",
}

export async function generateMetadata() {
  const settings = await reader.singletons.settings.read()
  const home = await reader.singletons.home.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")
  if (!home) throw new Error("Keystatic Content Not Found - Home Page")

  const { siteName, url, metaTitle: title } = settings
  const { metaDescription: description } = home

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: "/",
      siteName,
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary",
    },
    alternates: {
      canonical: "/",
    },
    verification: {
      google: "1k9fSdlfvgYGjJYg4ibNvDSDjhhFX3XBUTQGYnZigFI",
    },
  }
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const { navLinks, email, mailingListTitle, mailingListDescription } = settings

  return (
    <html
      lang="en"
      className="scroll-p-16 overscroll-none scroll-smooth lg:scroll-p-24 2xl:scroll-p-20"
    >
      <Script
        strategy="lazyOnload"
        src="https://umami.neeshsamsi.com/script.js"
        data-website-id="cc681e71-31cf-4b34-8101-c5926a8fef1f"
      />

      <body
        className={`${montserrat.variable} ${reckless.variable} overscroll-none bg-lighter font-sans text-darker`}
      >
        <Navbar navLinks={navLinks} />
        {children}
        <Footer
          email={email}
          navLinks={navLinks}
          mailingListTitle={mailingListTitle}
          mailingListDescription={mailingListDescription}
        />
      </body>
    </html>
  )
}
