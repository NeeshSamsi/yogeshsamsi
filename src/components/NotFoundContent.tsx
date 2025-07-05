"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFoundContent() {
  const pathname = usePathname()

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-4 sm:gap-6 xl:gap-12">
      <h1 className="text-center font-serif text-3xl font-bold tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
        This Page Doesn&rsquo;t Exist
      </h1>
      <h2 className="mx-auto text-center text-lg tracking-wide sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
        The page {pathname} could not be found. Consider visiting the Home page
        or if you think this is a mistake, kindly reach out to us.
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium sm:text-lg md:gap-6 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">
        <Button asChild variant="primary" theme="darker">
          <Link href="/">
            <span>Back to Homepage</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
