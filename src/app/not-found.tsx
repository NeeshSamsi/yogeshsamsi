import "./(main)/globals.css"

import type { Metadata, Viewport } from "next"

import NotFoundContent from "@/components/NotFoundContent"
import { montserrat, reckless } from "@/lib/fonts"

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
      className={`${montserrat.variable} ${reckless.variable} bg-lighter text-darker md:px-col-inner min-h-screen overscroll-none px-8 py-12 font-sans md:py-20 2xl:py-32`}
    >
      <NotFoundContent />
    </main>
  )
}

export default NotFound
