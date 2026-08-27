import { montserrat, reckless } from "@/lib/fonts"

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
