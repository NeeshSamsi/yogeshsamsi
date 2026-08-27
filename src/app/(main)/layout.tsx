import "./globals.css"

import { type Viewport } from "next"

import { readSingleton } from "@/lib/content"
import pageMetadata from "@/lib/pageMetadata"

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
  const { siteName, url, metaTitle: title } = await readSingleton("settings")
  const { metaDescription: description } = await readSingleton("home")

  const base = pageMetadata({ title, description, path: "/" })

  return {
    ...base,
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    openGraph: {
      ...base.openGraph,
      siteName,
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
  const settings = await readSingleton("settings")
  const masterclass = await readSingleton("masterclass")

  const { navLinks, emails, mailingListTitle, mailingListDescription } =
    settings
  const { active, title } = masterclass

  return (
    <>
      <Umami />
      {active && <MasterclassBanner title={title} />}
      <Navbar navLinks={navLinks} />
      {children}
      <Footer
        emails={emails}
        navLinks={navLinks}
        mailingListTitle={mailingListTitle}
        mailingListDescription={mailingListDescription}
      />
    </>
  )
}
