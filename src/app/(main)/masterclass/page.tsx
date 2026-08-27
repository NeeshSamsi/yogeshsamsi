import { type Metadata } from "next"

import { readSingleton } from "@/lib/content"
import pageMetadata from "@/lib/pageMetadata"
import Image from "next/image"
import { DocumentRenderer } from "@keystatic/core/renderer"
import { ArrowDownIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MasterclassRegistration from "@/components/MasterclassRegistration"

export async function generateMetadata(): Promise<Metadata> {
  const { metaTitle, metaDescription } = await readSingleton("masterclass")

  return pageMetadata({
    title: metaTitle,
    description: metaDescription,
    path: "/masterclass",
  })
}

export default async function Masterclass() {
  const masterclass = await readSingleton("masterclass", {
    resolveLinkedFiles: true,
  })
  const {
    heroImage,
    heroMobileImage,
    heroImageAlt,
    active,
    title,
    dates,
    deadline,
    details,
    formLink,
  } = masterclass

  if (!formLink)
    throw new Error("Keystatic Content Not Found - Masterclass Form Link")

  // const active = true

  return (
    <>
      <p className="bg-lighter text-darker block py-1 text-center text-base font-semibold sm:text-lg lg:py-3 lg:text-xl 2xl:text-2xl">
        {active
          ? `Deadline for registration is: ${deadline}`
          : "This Masterclass is No Longer Accepting Registrations"}
      </p>
      <main className="text-lighter md:px-col-inner relative flex aspect-[1/1.6] w-full px-8 text-center md:aspect-[1/0.52] md:items-center md:text-start">
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
        <div className="3xl:gap-12 mx-auto flex max-w-screen-2xl grow flex-col items-center gap-4 pt-12 md:items-start md:pt-0 xl:gap-8 2xl:gap-10">
          <h1 className="3xl:text-8xl max-w-[15ch] font-serif text-4xl font-semibold tracking-wider text-balance sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            {title}
          </h1>
          <h2 className="text-light 3xl:text-5xl max-w-[20ch] text-2xl text-balance sm:text-3xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl">
            Yogesh Samsi International Masterclass
          </h2>
          <p className="text-lg font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
            {dates}
          </p>
          {active && (
            <div className="3xl:text-3xl flex flex-row flex-wrap justify-center gap-2 text-sm font-medium sm:text-lg md:flex-col md:justify-start md:text-base lg:flex-row lg:items-center lg:gap-6 lg:text-lg xl:text-xl 2xl:text-2xl">
              <MasterclassRegistration
                formLink={formLink}
                callToAction={{ variant: "primary", theme: "light" }}
              />
              <Button asChild variant="secondary" theme="light">
                <Link href="/masterclass#details">
                  <span>Learn more</span>
                  <span>
                    <ArrowDownIcon
                      strokeWidth={2.5}
                      className="3xl:w-8 aspect-square w-4 sm:w-5 xl:w-6"
                    />
                  </span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <section
        id="details"
        className="bg-lighter text-darker md:px-col-inner px-8 py-12 md:py-20 2xl:py-32"
      >
        <div className="mx-auto max-w-screen-2xl space-y-8 md:space-y-12 2xl:space-y-16">
          <article className="prose prose-sm text-darker md:prose-base 2xl:prose-lg 3xl:prose-xl marker:text-darker prose-p:font-medium prose-li:font-medium">
            <DocumentRenderer document={details} />
          </article>

          {active && (
            <div className="3xl:text-3xl w-fit text-sm font-medium sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <MasterclassRegistration
                formLink={formLink}
                callToAction={{ variant: "primary", theme: "dark" }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
