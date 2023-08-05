import "./globals.css"

import { Montserrat } from "next/font/google"
import localFont from "next/font/local"

import reader from "@/lib/keystatic"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

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
    themeColor: "#362009",
    alternates: {
      canonical: "/",
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

  return (
    <html
      lang="en"
      className="scroll-p-16 scroll-smooth lg:scroll-p-24 2xl:scroll-p-20 overscroll-none"
    >
      <body
        className={`${montserrat.variable} ${reckless.variable} overscroll-none bg-lighter font-sans text-darker`}
      >
        <Navbar navLinks={settings.navLinks} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
