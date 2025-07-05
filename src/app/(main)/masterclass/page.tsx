import { type Metadata } from "next"

import reader from "@/lib/keystatic"
import Image from "next/image"
import { DocumentRenderer } from "@keystatic/core/renderer"
import {
  ArrowDownIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MasterclassRegistration from "@/components/MasterclassRegistration"

export async function generateMetadata(): Promise<Metadata> {
  const masterclass = await reader.singletons.masterclass.read({
    resolveLinkedFiles: true,
  })
  if (!masterclass)
    throw new Error("Keystatic Content Not Found - Masterclass Page")

  return {
    title: masterclass.metaTitle,
    description: masterclass.metaDescription,
  }
}

export default async function Masterclass() {
  const masterclass = await reader.singletons.masterclass.read({
    resolveLinkedFiles: true,
  })
  if (!masterclass)
    throw new Error("Keystatic Content Not Found - Masterclass Page")
  const {
    heroImage,
    heroMobileImage,
    heroImageAlt,
    active,
    title,
    dates,
    deadline,
    formLink,
    details,
  } = masterclass

  return (
    <>
      <p className="block bg-lighter py-1 text-center text-base font-semibold text-darker sm:text-lg lg:py-3 lg:text-xl 2xl:text-2xl">
        {active
          ? `Deadline for registration is: ${deadline}`
          : "This Masterclass is No Longer Accepting Registrations"}
      </p>
      <main className="relative flex aspect-[1/1.6] w-full px-8 text-center text-lighter md:aspect-[1/0.52] md:items-center md:px-col-inner md:text-start">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          className="-z-10 hidden object-cover md:block"
          fill
          priority
          sizes="100vw"
        />
        <Image
          src={heroMobileImage}
          alt={heroImageAlt}
          className="-z-10 block h-full w-full object-cover object-top md:hidden"
          fill
          priority
          sizes="100vw"
        />
        <div className="mx-auto flex max-w-screen-2xl flex-grow flex-col items-center gap-4 pt-12 md:items-start md:pt-0 xl:gap-8 2xl:gap-10 3xl:gap-12">
          <h1 className="max-w-[15ch] text-balance font-serif text-4xl font-semibold tracking-wider sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl">
            {title}
          </h1>
          <h2 className="max-w-[20ch] text-balance text-2xl text-light sm:text-3xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl">
            Yogesh Samsi International Masterclass
          </h2>
          <p className="text-lg font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
            {dates}
          </p>
          <div className="space-y-6 text-sm font-medium sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:space-y-8 2xl:text-2xl 3xl:space-y-12 3xl:text-3xl">
            <div className="flex flex-row flex-wrap items-center justify-center gap-2 md:flex-col md:justify-start md:gap-6 lg:flex-row">
              <MasterclassRegistration />
              <Button asChild variant="secondary" theme="light">
                <Link href="/masterclass#details">
                  <span>Learn more</span>
                  <span>
                    <ArrowDownIcon className="aspect-square w-4 stroke-[2.5px] sm:w-5 xl:w-6 3xl:w-8" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <section
        id="details"
        className="bg-lighter px-8 py-12 text-darker md:px-col-inner md:py-20 2xl:py-32"
      >
        <div className="mx-auto max-w-screen-2xl space-y-8 md:space-y-12 2xl:space-y-16">
          <article className="prose prose-sm text-darker md:prose-base 2xl:prose-lg 3xl:prose-xl marker:text-darker prose-p:font-medium prose-li:font-medium">
            <DocumentRenderer document={details} />
          </article>

          <div className="w-fit text-sm font-medium sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">
            <Button asChild variant="primary" theme="dark">
              <Link href={formLink || "/masterclass#details"} target="_blank">
                <span>Apply Now</span>
                <span>
                  <ArrowTopRightOnSquareIcon className="aspect-square w-4 sm:w-5 xl:w-6 3xl:w-8" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
