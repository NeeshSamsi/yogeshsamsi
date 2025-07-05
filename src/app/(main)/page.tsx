import Image from "next/image"

import reader from "@/lib/keystatic"

import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"
import Section from "@/components/Section"
import SectionHeading from "@/components/SectionHeading"
import { Button } from "@/components/ui/button"
import Event from "@/components/Event"
import Link from "next/link"

const Home = async () => {
  const home = await reader.singletons.home.read()
  const events = (
    await reader.collections.events.all({ resolveLinkedFiles: true })
  )
    .sort(
      (a, b) => Number(new Date(a.entry.date)) - Number(new Date(b.entry.date)),
    )
    .map((event) => {
      const { internal, ...rest } = event.entry

      if (internal.discriminant) {
        return {
          ...rest,
          date: new Intl.DateTimeFormat("en-GB", {
            dateStyle: "medium",
          }).format(new Date(rest.date)),
          ctaLink: `/${event.slug}`,
        }
      } else {
        return {
          ...rest,
          date: new Intl.DateTimeFormat("en-GB", {
            dateStyle: "medium",
          }).format(new Date(rest.date)),
        }
      }
    })
  const testimonials = (await reader.collections.testimonials.all()).map(
    (testimonial) => ({
      ...testimonial.entry,

      name: testimonial.slug,
    }),
  )

  if (!home) throw new Error("Keystatic Content Not Found - Home Page")
  if (!events) throw new Error("Keystatic Content Not Found - Upcoming Events")
  if (!testimonials)
    throw new Error("Keystatic Content Not Found - Press Testimonials")

  const {
    heroImage,
    heroMobileImage,
    heroImageAlt,
    aboutHeadline,
    aboutCards,
  } = home

  return (
    <>
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
        <div className="mx-auto flex max-w-screen-2xl flex-grow flex-col items-center gap-8 pt-12 md:items-start md:pt-0 xl:gap-12 2xl:gap-16 3xl:gap-20">
          <h1 className="font-serif text-4xl font-semibold tracking-wider sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl">
            Yogesh Samsi
          </h1>
          <div className="space-y-6 text-sm font-medium sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:space-y-8 2xl:text-2xl 3xl:space-y-12 3xl:text-3xl">
            <div className="flex flex-wrap items-center gap-2 md:gap-6">
              <Button asChild variant="primary" theme="light">
                <Link href="/#events">
                  <span>Upcoming events</span>
                  <span>
                    <ArrowRightIcon className="aspect-square w-4 stroke-[2.5px] sm:w-5 xl:w-6 3xl:w-8" />
                  </span>
                </Link>
              </Button>
              <Button asChild variant="secondary" theme="light">
                <Link href="/contact">
                  <span>Reach out</span>
                  <span>
                    <ChatBubbleLeftRightIcon className="aspect-square w-4 stroke-[2.5px] sm:w-5 xl:w-6 3xl:w-8" />
                  </span>
                </Link>
              </Button>
            </div>
            <p className="text-light">
              Are you an organiser?{" "}
              <Link
                href="/about"
                className="underline underline-offset-2 transition-colors hover:text-lighter"
              >
                Download Biodata
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Section bgClr="bg-lighter" txtClr="text-darker">
        <h2 className="mx-auto text-center font-serif text-xl tracking-wide sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          {aboutHeadline}
        </h2>
        <div className="mx-auto grid max-w-lg gap-6 lg:max-w-none lg:grid-cols-3 lg:gap-8 2xl:gap-12">
          {aboutCards.map(({ title, description }, i) => (
            <div key={i} className="space-y-4 border border-darker p-4">
              <h3 className="font-serif text-lg font-semibold tracking-wide sm:text-xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                {title}
              </h3>
              <p className="text-base sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="events" bgClr="bg-dark" txtClr="text-lighter">
        <SectionHeading as="h2" text="Upcoming events" />

        <div className="mx-auto max-w-lg lg:max-w-none">
          {events.length > 0 ? (
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2 xl:gap-x-16 xl:gap-y-12 3xl:gap-x-20 3xl:gap-y-16">
              {events.map((event, i) => (
                <Event key={i} event={event} theme="Lighter" />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              No upcoming events. Join the mailing list to stay up to date.
            </p>
          )}
        </div>
      </Section>

      <Section bgClr="bg-lighter" txtClr="text-lighter">
        {testimonials.map(({ name, logo, quote }, i) => (
          <div
            key={i}
            className="mx-auto mt-10 w-full max-w-lg bg-dark px-12 shadow-lg shadow-dark/50 lg:mt-12 lg:max-w-none"
          >
            <div className="flex -translate-y-10 flex-col items-center gap-4 lg:-translate-y-12 xl:gap-6">
              <Image
                src={logo}
                alt={`${name} Logo`}
                height={220}
                width={220}
                sizes="(min-width: 1540px) 128px, (min-width: 1040px) 96px, 80px"
                className="aspect-square w-20 rounded-full lg:w-24 2xl:w-32"
              />
              <div className="mb-6 flex w-full max-w-3xl items-center gap-8 xl:gap-16 2xl:max-w-5xl">
                <div className="hidden aspect-square h-28 text-light lg:block 2xl:h-36">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      d="M8.5 21A35 35 0 0 0 0 45.2v40.8c0 1.4.6 2.6 1.5 3.6A5 5 0 0 0 5 91h30c5.5 0 10-4.6 10-10.2V45.1c0-1.4-.5-2.6-1.5-3.6A5 5 0 0 0 40 40H24.6c.1-2.5.9-5 2.2-7.1C29.3 28.8 34 26 41 24.6l4-.8V9.4h-5c-13.9 0-24.5 4-31.5 11.7Zm55 0A35 35 0 0 0 55 45.2v40.8c0 1.4.6 2.6 1.5 3.6A5 5 0 0 0 60 91h30c5.5 0 10-4.6 10-10.2V45.1c0-1.4-.5-2.6-1.5-3.6A5 5 0 0 0 95 40H79.6c.1-2.5.9-5 2.2-7.1C84.3 28.8 89 26 96 24.6l4-.8V9.4h-5c-13.9 0-24.5 4-31.5 11.7Z"
                    />
                  </svg>
                </div>
                <div className="hidden h-36 w-1 bg-lighter lg:block 2xl:h-44" />
                <h4 className="text-center text-base sm:text-lg md:text-base lg:text-start lg:text-lg xl:text-xl 2xl:text-2xl">
                  {quote}
                </h4>
              </div>
              <h3 className="font-serif text-lg font-semibold sm:text-xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                {name}
              </h3>
            </div>
          </div>
        ))}
      </Section>
    </>
  )
}

export default Home
