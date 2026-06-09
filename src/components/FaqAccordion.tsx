"use client"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import { ChevronDown } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <Disclosure key={i}>
          <div className="bg-light">
            <DisclosureButton className="group flex w-full items-center justify-between px-6 py-5 text-left md:px-8 md:py-6">
              <span className="font-serif text-xl font-semibold tracking-wide lg:text-2xl xl:text-3xl 2xl:text-4xl">
                {item.question}
              </span>
              <ChevronDown
                className="ml-4 h-6 w-6 shrink-0 transition-transform duration-300 group-data-[open]:rotate-180 xl:h-8 xl:w-8"
                strokeWidth={1.5}
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
    </div>
  )
}
