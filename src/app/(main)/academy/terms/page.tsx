import { type Metadata } from "next"

import reader from "@/lib/keystatic"
import Link from "next/link"
import { DocumentRenderer } from "@keystatic/core/renderer"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

export async function generateMetadata(): Promise<Metadata> {
  const terms = await reader.singletons.academyTerms.read()
  if (!terms)
    throw new Error("Keystatic Content Not Found - Academy Terms of Service")

  return {
    title: terms.meta.metaTitle,
    description: terms.meta.metaDescription,
  }
}

export default async function AcademyTerms() {
  const terms = await reader.singletons.academyTerms.read({
    resolveLinkedFiles: true,
  })
  if (!terms)
    throw new Error("Keystatic Content Not Found - Academy Terms of Service")

  const { title, intro, lastUpdated, body } = terms

  return (
    <main className="bg-lighter px-8 py-12 text-darker md:px-col-inner md:py-20 2xl:py-32">
      <div className="mx-auto max-w-screen-2xl space-y-8 md:space-y-12 2xl:space-y-16">
        <div className="space-y-4 md:space-y-6">
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 text-base transition-colors hover:text-darker/80 lg:text-lg xl:text-xl"
          >
            <ArrowLeftIcon
              strokeWidth={2.5}
              className="aspect-square w-4 xl:w-5"
            />
            <span>Back to the Academy</span>
          </Link>

          <h1 className="font-serif text-3xl font-semibold tracking-wider sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            {title}
          </h1>

          <p className="text-base text-darker/80 lg:text-lg xl:text-xl">
            Last updated on {formatDate(lastUpdated)}
          </p>

          {intro && (
            <p className="max-w-[70ch] text-base sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {intro}
            </p>
          )}
        </div>

        <article className="prose prose-lg max-w-[80ch] text-darker xl:prose-xl marker:text-darker prose-headings:font-serif prose-headings:text-darker prose-p:text-darker prose-a:text-darker prose-strong:text-darker prose-li:text-darker">
          <DocumentRenderer document={body} />
        </article>
      </div>
    </main>
  )
}

// The Keystatic date field gives us a YYYY-MM-DD string - parse it as local
// time so the displayed date never shifts by a day across timezones.
function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
