import "../(main)/globals.css"

import { Montserrat } from "next/font/google"
import localFont from "next/font/local"

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

export default function MailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${montserrat.variable} ${reckless.variable} bg-lighter text-darker min-h-screen font-sans`}
    >
      {children}
    </div>
  )
}
