"use client"

import { usePathname } from "next/navigation"
import Button from "./Button"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

type Props = {
  title: string
}

export default function MasterclassBanner({ title }: Props) {
  const pathname = usePathname()

  if (pathname === "/masterclass") return null

  return (
    <p className="flex flex-col items-center justify-center bg-lighter px-8 py-1 text-center text-base font-medium text-darker sm:flex-row sm:text-lg lg:py-3 lg:text-xl 2xl:text-2xl">
      <span>{title} by Yogesh Samsi</span>
      <Button as="link" theme="Darker" type="Secondary">
        <span className="font-semibold underline">Join now</span>
        <ArrowRightIcon className="aspect-square size-4 stroke-[2.5px] lg:size-6" />
      </Button>
    </p>
  )
}
