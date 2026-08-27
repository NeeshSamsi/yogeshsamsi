import "./globals.css"

import { type Viewport } from "next"

import reader from "@/lib/keystatic"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import MasterclassBanner from "@/components/MasterclassBanner"
import Umami from "@/components/Umami"

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

  const masterclass = await reader.singletons.masterclass.read()
  if (!masterclass)
    throw new Error("Keystatic Content Not Found - Masterclass Page")

  const { navLinks, email, mailingListTitle, mailingListDescription } = settings
  const { active, title } = masterclass

  return (
    <>
      <Umami />
      {active && <MasterclassBanner title={title} />}
      <Navbar navLinks={navLinks} />
      {children}
      <Footer
        email={email}
        navLinks={navLinks}
        mailingListTitle={mailingListTitle}
        mailingListDescription={mailingListDescription}
      />
    </>
  )
}
