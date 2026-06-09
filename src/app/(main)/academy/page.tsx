import { type Metadata } from "next"

import reader from "@/lib/keystatic"
import Image from "next/image"
import Link from "next/link"
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import Section from "@/components/Section"
import DynamicIcon from "@/components/DynamicIcon"
import FaqAccordion from "@/components/FaqAccordion"

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

  const { hero, philosophy, features, team, faq } = academy
  const { title, description, heroImage, heroMobileImage, heroImageAlt } = hero

  return (
    <>
      <main className="relative flex aspect-[1/2.34] w-full px-8 text-center text-lighter md:aspect-[1/0.52] md:items-center md:px-col-inner md:text-start">
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
          <p className="max-w-[50ch] text-balance text-base text-light sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            {description}
          </p>
          <div className="flex flex-row flex-wrap justify-center gap-2 text-sm font-medium sm:text-lg md:flex-col md:justify-start md:gap-6 md:text-base lg:flex-row lg:items-center lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">
            <Button asChild variant="primary" theme="light">
              <Link href="">
                <span>Enroll Now</span>
                <span>
                  <ArrowRightIcon
                    strokeWidth={2.5}
                    className="aspect-square w-4 sm:w-5 xl:w-6 3xl:w-8"
                  />
                </span>
              </Link>
            </Button>
            <Button asChild variant="secondary" theme="light">
              <Link href="/academy#philosophy">
                <span>See how it works</span>
                <span>
                  <ArrowDownIcon
                    strokeWidth={2.5}
                    className="aspect-square w-4 sm:w-5 xl:w-6 3xl:w-8"
                  />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Section id="philosophy" bgClr="bg-lighter" txtClr="text-darker">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16 xl:gap-20 2xl:gap-24">
          {/* Sticky video embed */}
          <div className="md:sticky md:top-24 lg:top-28">
            <div className="relative aspect-video w-full overflow-hidden bg-light">
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

          {/* Title + paragraphs */}
          <div className="space-y-6 md:space-y-8 2xl:space-y-10">
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
                  className="h-8 w-8 shrink-0 xl:h-10 xl:w-10"
                  strokeWidth={1.5}
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
    </>
  )
}
