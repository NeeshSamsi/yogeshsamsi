import { cache } from "react"
import { notFound } from "next/navigation"

import reader from "@/lib/keystatic"
import pageMetadata from "@/lib/pageMetadata"
import { DocumentRenderer } from "@keystatic/core/renderer"

import {
  ClockIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline"
import { CalendarIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  params: Promise<{
    eventSlug: string
  }>
}

// UTIL FUNCTIONS

async function getInternalEventPaths() {
  const events = await reader.collections.events.all()

  return events
    .filter(({ entry }) => entry.internal.discriminant === true)
    .map((event) => event.slug)
}

// One lookup for "the internal event at this slug, parsed". Replaces the old
// validate-then-read pair (list the whole collection to check the slug exists,
// then read the same slug again) and the copy of this parsing logic that lived
// inline in the page component. Returns null for a missing slug or an external
// event so the caller can `notFound()`. Memoised so `generateMetadata` and the
// page component share the one read.
const getInternalEvent = cache(async (eventSlug: string) => {
  const event = await reader.collections.events.read(eventSlug, {
    resolveLinkedFiles: true,
  })

  if (!event || event.internal.discriminant !== true) return null

  const {
    internal: { value },
    ...rest
  } = event

  return { ...rest, ...value }
})

// NEXT FUNCTIONS

export async function generateStaticParams() {
  return getInternalEventPaths()
}

export async function generateMetadata(props: Props) {
  const { eventSlug } = await props.params

  const event = await getInternalEvent(eventSlug)
  if (!event) return {}

  const { title, description } = event

  return pageMetadata({ title, description, path: `/${eventSlug}` })
}

const EventPage = async (props: Props) => {
  const { eventSlug } = await props.params

  const event = await getInternalEvent(eventSlug)
  if (!event) notFound()

  const {
    title,
    description,
    date,
    name,
    link,
    ctaText,
    ctaLink,
    page,
    timings,
  } = event

  return (
    <main className="bg-lighter text-dark md:px-col-inner mx-auto max-w-lg px-8 py-12 md:max-w-none md:py-20 2xl:py-32">
      <div className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-16">
        <article className="grid gap-10">
          <h1 className="3xl:text-7xl font-serif text-4xl font-bold tracking-wide sm:text-5xl lg:text-5xl xl:text-6xl">
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

          <p className="3xl:text-2xl max-w-prose text-base font-medium sm:text-lg xl:text-xl">
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

          <div className="3xl:text-2xl w-fit text-base font-medium sm:text-lg xl:text-xl">
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
  const place = (
    <>
      <span>
        {name.toLowerCase() === "online" ? (
          <GlobeAltIcon className="3xl:w-8 aspect-square w-4 sm:w-5 xl:w-6" />
        ) : (
          <MapPinIcon className="3xl:w-8 aspect-square w-4 sm:w-5 xl:w-6" />
        )}
      </span>
      <p>{name}</p>
    </>
  )

  return (
    <aside className="3xl:text-xl sticky top-36 flex h-fit flex-col gap-4 text-start text-sm font-medium sm:text-base lg:gap-6 xl:text-lg">
      <div className="flex items-start gap-2 lg:gap-4">
        <span>
          <CalendarIcon className="3xl:w-8 aspect-square w-4 stroke-[2.5px] sm:w-5 xl:w-6" />
        </span>
        <p>{date}</p>
      </div>
      <div className="flex items-start gap-2 lg:gap-4">
        <span>
          <ClockIcon className="3xl:w-8 aspect-square w-4 sm:w-5 xl:w-6" />
        </span>
        <p>{timings}</p>
      </div>
      <div className="flex items-start gap-2 lg:gap-4">
        {link ? <a href={link}>{place}</a> : place}
      </div>
      <div className="w-fit lg:w-auto">
        <CTA ctaText={ctaText} ctaLink={ctaLink} />
      </div>
    </aside>
  )
}

const CTA = ({ ctaText, ctaLink }: { ctaText: string; ctaLink: string }) => {
  return (
    <Button asChild variant="primary" theme="darker">
      <Link href={ctaLink}>{ctaText}</Link>
    </Button>
  )
}

export default EventPage
