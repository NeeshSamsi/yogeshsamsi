import { notFound } from "next/navigation"

import reader from "@/lib/keystatic"
import { DocumentRenderer } from "@keystatic/core/renderer"

import {
  ClockIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline"
import { CalendarIcon } from "@heroicons/react/24/solid"
import Button from "@/components/Button"

type Props = {
  params: {
    eventSlug: string
  }
}

// UTIL FUNCTIONS

async function getEventsPaths() {
  const events = await (await reader.collections.events.all())
    .filter(({ entry }) => entry.internal.discriminant === true)
    .map((event) => event.slug)

  return events
}

async function validateEvent(eventSlug: string) {
  const slugs = await getEventsPaths()

  if (slugs.find((slug) => slug === eventSlug)) {
    return true
  } else {
    return false
  }
}

export async function parseEvent(eventSlug: string) {
  const rawEvent = await reader.collections.events.read(eventSlug, {
    resolveLinkedFiles: true,
  })
  if (!rawEvent)
    throw new Error(
      `Keystatic Content Not Found - Event with slug: ${eventSlug}`,
    )
  if (!rawEvent.internal.value)
    throw new Error(
      `Invalid Keystatic Configuration - No timings or page content for event with slug: ${eventSlug}`,
    )

  const {
    internal: { value },
    ...rest
  } = rawEvent

  return {
    ...rest,
    ...value,
  }
}

// NEXT FUNCTIONS

export async function generateStaticParams() {
  return getEventsPaths()
}

export async function generateMetadata({ params }: Props) {
  const { eventSlug } = params

  if (await validateEvent(eventSlug)) {
    const event = await parseEvent(eventSlug)

    const { title, description } = event

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/${eventSlug}`,
        type: "website",
      },
      twitter: {
        title,
        description,
        card: "summary",
      },
      themeColor: "#362009",
      alternates: {
        canonical: `/${eventSlug}`,
      },
    }
  }
}

const EventPage = async ({ params }: Props) => {
  const { eventSlug } = params

  if (!(await validateEvent(eventSlug))) {
    notFound()
  }

  const rawEvent = await reader.collections.events.read(eventSlug, {
    resolveLinkedFiles: true,
  })
  if (!rawEvent)
    throw new Error(
      `Keystatic Content Not Found - Event with slug: ${eventSlug}`,
    )
  if (!rawEvent.internal.value)
    throw new Error(
      `Invalid Keystatic Configuration - No timings or page content for event with slug: ${eventSlug}`,
    )

  const {
    title,
    description,
    date,
    name,
    link,
    ctaText,
    ctaLink,
    internal: {
      value: { page, timings },
    },
  } = rawEvent

  return (
    <main className="mx-auto max-w-lg bg-lighter px-8 py-12 text-dark md:max-w-none md:px-col-inner md:py-20 2xl:py-32 ">
      <div className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-16">
        <article className="grid gap-10">
          <h1 className="font-serif text-4xl font-bold tracking-wide sm:text-5xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
            {title}
          </h1>

          <div className="block lg:hidden">
            <Details
              date={date}
              timings={timings}
              name={name}
              link={link}
              ctaText={ctaText}
              ctaLink={ctaLink}
            />
          </div>

          <p className="max-w-prose text-base font-medium sm:text-lg xl:text-xl 3xl:text-2xl">
            {description}
          </p>

          {page.map(({ subtitle, content }) => (
            <div key={subtitle} className="grid gap-6">
              <h2 className="max-w-prose font-serif text-2xl font-semibold sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl">
                {subtitle}
              </h2>

              <div className="prose text-darker sm:prose-lg xl:prose-xl 3xl:prose-2xl marker:text-darker">
                <DocumentRenderer document={content} />
              </div>
            </div>
          ))}

          <div className="w-fit text-base font-medium sm:text-lg xl:text-xl 3xl:text-2xl">
            <CTA ctaText={ctaText} ctaLink={ctaLink} />
          </div>
        </article>

        <div className="hidden lg:block">
          <Details
            date={date}
            timings={timings}
            name={name}
            link={link}
            ctaText={ctaText}
            ctaLink={ctaLink}
          />
        </div>
      </div>
    </main>
  )
}

const Details = ({
  date,
  timings,
  name,
  link,
  ctaText,
  ctaLink,
}: {
  date: string
  timings: string
  name: string
  link: string | null
  ctaText: string
  ctaLink: string
}) => {
  return (
    <aside className="sticky top-36 flex h-fit flex-col gap-4 text-start text-sm font-medium sm:text-base lg:gap-6 xl:text-lg 3xl:text-xl">
      <div className="flex items-start gap-2 lg:gap-4">
        <span>
          <CalendarIcon className="aspect-square w-4 stroke-[2.5px] sm:w-5 xl:w-6 3xl:w-8" />
        </span>
        <p>{date}</p>
      </div>
      <div className="flex items-start gap-2 lg:gap-4">
        <span>
          <ClockIcon className="aspect-square w-4 sm:w-5 xl:w-6 3xl:w-8" />
        </span>
        <p>{timings}</p>
      </div>
      <div className="flex items-start gap-2 lg:gap-4">
        {link ? (
          <a href={link}>
            <span>
              {name.toLowerCase() === "online" ? (
                <GlobeAltIcon className="aspect-square w-4 sm:w-5 xl:w-6 3xl:w-8" />
              ) : (
                <MapPinIcon className="aspect-square w-4 sm:w-5 xl:w-6 3xl:w-8" />
              )}
            </span>
            <p>{name}</p>
          </a>
        ) : (
          <>
            <span>
              {name.toLowerCase() === "online" ? (
                <GlobeAltIcon className="aspect-square w-4 sm:w-5 xl:w-6 3xl:w-8" />
              ) : (
                <MapPinIcon className="aspect-square w-4 sm:w-5 xl:w-6 3xl:w-8" />
              )}
            </span>
            <p>{name}</p>
          </>
        )}
      </div>
      <div className="w-fit lg:w-auto">
        <CTA ctaText={ctaText} ctaLink={ctaLink} />
      </div>
    </aside>
  )
}

const CTA = ({ ctaText, ctaLink }: { ctaText: string; ctaLink: string }) => {
  return (
    <Button as="link" type="Primary" theme="Darker" href={ctaLink}>
      <span>{ctaText}</span>
    </Button>
  )
}

export default EventPage
