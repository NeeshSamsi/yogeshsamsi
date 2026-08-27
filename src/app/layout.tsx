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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${reckless.variable} scroll-p-16 overscroll-none scroll-smooth lg:scroll-p-24 2xl:scroll-p-20`}
    >
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      {/* Shared page chrome lives here, not in (main)/layout.tsx, so there is
          exactly one <html>/<body> in the tree. These Tailwind classes are
          inert on /keystatic, which never imports globals.css. */}
      <body className="bg-lighter text-darker overscroll-none font-sans">
        {children}
      </body>
    </html>
  )
}
