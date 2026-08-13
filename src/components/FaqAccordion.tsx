"use client"

import { useState } from "react"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FaqItem {
  question: string
  answer: string
}

const STEP = 4

export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [visibleCount, setVisibleCount] = useState(STEP)
  const remaining = items.length - visibleCount

  return (
    <div className="space-y-4">
      {items.slice(0, visibleCount).map((item, i) => (
        <Disclosure key={i}>
          <div className="bg-light">
            <DisclosureButton className="group flex w-full items-center justify-between px-4 py-2 text-left md:px-6 md:py-4">
              <span className="font-serif text-xl font-semibold tracking-wide lg:text-2xl xl:text-3xl 2xl:text-4xl">
                {item.question}
              </span>
              <ChevronDown
                className="ml-4 h-6 w-6 shrink-0 transition-transform duration-300 group-data-[open]:rotate-180 xl:h-8 xl:w-8"
                strokeWidth={2}
              />
            </DisclosureButton>
            <DisclosurePanel className="px-6 pb-6 md:px-8 md:pb-8">
              <div>
                <p className="text-base sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  {item.answer}
                </p>
              </div>
            </DisclosurePanel>
          </div>
        </Disclosure>
      ))}

      {remaining > 0 && (
        <div className="flex justify-center pt-4 text-sm font-medium sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">
          <Button
            variant="secondary"
            theme="darker"
            onClick={() =>
              setVisibleCount((count) => Math.min(count + STEP, items.length))
            }
          >
            <span>Show more</span>
            <span>
              <ChevronDown
                strokeWidth={2.5}
                className="aspect-square w-4 sm:w-5 xl:w-6 3xl:w-8"
              />
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}
