import "./(main)/globals.css"

import type { Metadata, Viewport } from "next"
import { Montserrat } from "next/font/google"
import localFont from "next/font/local"

import NotFoundContent from "@/components/NotFoundContent"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
})

const reckless = localFont({
  src: [
    {
      path: "../fonts/RecklessNeue/ttf/RecklessNeue-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/RecklessNeue/ttf/RecklessNeue-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/RecklessNeue/ttf/RecklessNeue-Bold.ttf",
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

const title = "Page Not Found"
const description =
  "Unfortunately, the page you were looking for was not found. Consider visiting the home page or reaching out."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    title,
    description,
    card: "summary",
  },
}

const NotFound = () => {
  return (
    <main
      className={`${montserrat.variable} ${reckless.variable} min-h-screen overscroll-none bg-lighter px-8 py-12 font-sans text-darker md:px-col-inner md:py-20 2xl:py-32`}
    >
      <NotFoundContent />
    </main>
  )
}

export default NotFound
