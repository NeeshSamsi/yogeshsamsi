import { type Metadata } from "next"

import reader from "@/lib/keystatic"
import Image from "next/image"
import Link from "next/link"
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import Section from "@/components/Section"
import DynamicIcon from "@/components/DynamicIcon"
import FaqAccordion from "@/components/FaqAccordion"
import ProcessTimeline from "@/components/ProcessTimeline"
import AcademyRegistration from "@/components/AcademyRegistration"

// TEMP: Philosophy video embed is hidden. Flip back to true to restore it —
// the Keystatic YouTube Embed Link field is left untouched in the meantime.
const SHOW_PHILOSOPHY_VIDEO: boolean = false

export async function generateMetadata(): Promise<Metadata> {
  const academy = await reader.singletons.academy.read()
  if (!academy) throw new Error("Keystatic Content Not Found - Academy Page")

  return {
    title: academy.meta.metaTitle,
    description: academy.meta.metaDescription,
  }
}

export default async function Academy() {
  const academy = await reader.singletons.academy.read()
  if (!academy) throw new Error("Keystatic Content Not Found - Academy Page")

  const {
    active,
    inactiveNotice,
    hero,
    philosophy,
    features,
    process: processSection,
    team,
    faq,
    cta,
  } = academy
  const { title, description, heroImage, heroMobileImage, heroImageAlt } = hero

  return (
    <>
      {!active && (
        <p className="bg-lighter text-darker block py-1 text-center text-base font-semibold sm:text-lg lg:py-3 lg:text-xl 2xl:text-2xl">
          {inactiveNotice}
        </p>
      )}
      <main className="text-darker md:px-col-inner relative flex aspect-[1/2.34] w-full px-8 text-center md:aspect-[1/0.52] md:items-center md:text-start">
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
          <p className="text-darker max-w-[50ch] text-base text-balance sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            {description}
          </p>
          <div className="3xl:text-3xl flex flex-row flex-wrap justify-center gap-2 text-sm font-medium sm:text-lg md:flex-col md:justify-start md:gap-6 md:text-base lg:flex-row lg:items-center lg:text-lg xl:text-xl 2xl:text-2xl">
            {active && (
              <AcademyRegistration
                callToAction={{ variant: "primary", theme: "darker" }}
              />
            )}
            <Button asChild variant="secondary" theme="darker">
              <Link href="/academy#features">
                <span>See how it works</span>
                <span>
                  <ArrowDownIcon
                    strokeWidth={2.5}
                    className="3xl:w-8 aspect-square w-4 sm:w-5 xl:w-6"
                  />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Section id="philosophy" bgClr="bg-lighter" txtClr="text-darker">
        <div
          className={`grid grid-cols-1 items-start gap-12 md:gap-16 xl:gap-20 2xl:gap-24 ${
            SHOW_PHILOSOPHY_VIDEO ? "md:grid-cols-2" : ""
          }`}
        >
          {/* Sticky video embed */}
          {SHOW_PHILOSOPHY_VIDEO && (
            <div className="md:sticky md:top-24 lg:top-28">
              <div className="bg-light relative aspect-video w-full overflow-hidden">
                {philosophy.videoLink && (
                  <iframe
                    src={philosophy.videoLink}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={philosophy.title}
                  />
                )}
              </div>
            </div>
          )}

          {/* Title + paragraphs */}
          <div
            className={`space-y-6 md:space-y-8 2xl:space-y-10 ${
              SHOW_PHILOSOPHY_VIDEO ? "" : "max-w-[80ch]"
            }`}
          >
            <h2 className="font-serif text-3xl font-semibold tracking-wide sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              {philosophy.title}
            </h2>
            <div className="space-y-4 md:space-y-6 2xl:space-y-8">
              {philosophy.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="features" bgClr="bg-lighter" txtClr="text-darker">
        <h2 className="font-serif text-3xl font-semibold tracking-wide sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
          {features.title}
        </h2>
        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2">
          {features.items.map((item, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <DynamicIcon
                  name={item.icon}
                  className="size-6 shrink-0 lg:size-8"
                  strokeWidth={2}
                />
                <h3 className="font-serif text-lg font-semibold lg:text-xl xl:text-2xl 2xl:text-3xl">
                  {item.title}
                </h3>
              </div>
              <p className="text-base sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="process" bgClr="bg-lighter" txtClr="text-darker">
        <h2 className="font-serif text-3xl font-semibold tracking-wide sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
          {processSection.title}
        </h2>
        <ProcessTimeline steps={processSection.steps} />
      </Section>

      <Section id="team" bgClr="bg-lighter" txtClr="text-darker">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16 xl:gap-20 2xl:gap-24">
          {/* Sticky team photo */}
          <div className="md:sticky md:top-24 lg:top-28">
            <div className="relative aspect-video w-full overflow-hidden bg-[#faf4e6]">
              {team.image && (
                <Image
                  src={team.image}
                  alt={team.imageAlt ?? ""}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              )}
            </div>
          </div>

          {/* Title + paragraphs */}
          <div className="space-y-6 md:space-y-8 2xl:space-y-10">
            <h2 className="font-serif text-3xl font-semibold tracking-wide sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              {team.title}
            </h2>
            <div className="space-y-4 md:space-y-6 2xl:space-y-8">
              {team.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq" bgClr="bg-lighter" txtClr="text-darker">
        <h2 className="font-serif text-3xl font-semibold tracking-wide sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
          {faq.title}
        </h2>
        <FaqAccordion items={faq.items} />
      </Section>

      {active && (
        <Section id="enroll" bgClr="bg-lighter" txtClr="text-darker">
          <div className="flex flex-col items-center gap-6 text-center md:gap-8 2xl:gap-10">
            <h2 className="max-w-[20ch] font-serif text-3xl font-semibold tracking-wide text-balance sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              {cta.title}
            </h2>
            <p className="max-w-[55ch] text-base text-balance sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {cta.description}
            </p>
            <div className="3xl:text-3xl text-sm font-medium sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <AcademyRegistration
                callToAction={{ variant: "primary", theme: "darker" }}
              />
            </div>
          </div>
        </Section>
      )}

      <div className="bg-lighter text-darker md:px-col-inner px-8 pb-12 md:pb-20 2xl:pb-32">
        <div className="mx-auto max-w-screen-2xl">
          <Link
            href="/academy/terms"
            className="hover:text-darker/80 text-sm underline underline-offset-4 transition-colors sm:text-base xl:text-lg"
          >
            Academy Terms of Service
          </Link>
        </div>
      </div>
    </>
  )
}
