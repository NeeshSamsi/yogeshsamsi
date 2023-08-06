"use client"

import "./(main)/globals.css"

import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import localFont from "next/font/local"
import { usePathname } from "next/navigation"

import Button from "@/components/Button"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"

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
  themeColor: "#362009",
}

const NotFound = () => {
  const pathname = usePathname()

  return (
    <main
      className={`${montserrat.variable} ${reckless.variable} min-h-screen overscroll-none bg-lighter px-8 py-12 font-sans text-darker md:px-col-inner md:py-20 2xl:py-32`}
    >
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-4 sm:gap-6 xl:gap-12">
        <h1 className="text-center font-serif text-3xl font-bold tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
          This Page Doesn&rsquo;t Exist
        </h1>
        <h2 className="mx-auto text-center text-lg tracking-wide sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          The page {pathname} could not be found. Consider visiting the Home
          page or if you think this is a mistake, kindly reach out to us.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium sm:text-lg md:gap-6 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">
          <Button
            as="link"
            text="Back to Homepage"
            type="Primary"
            theme="Darker"
            href="/"
          />
          <Button
            as="link"
            text="Reach out"
            icon={{
              element: <ChatBubbleLeftRightIcon />,
              sizes: "w-4 sm:w-5 xl:w-6 3xl:w-8",
            }}
            type="Secondary"
            theme="Darker"
            href="/contact"
          />
        </div>
      </div>
    </main>
  )
}

export default NotFound
