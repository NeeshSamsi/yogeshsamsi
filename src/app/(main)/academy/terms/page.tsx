import { type Metadata } from "next"

import { readSingleton } from "@/lib/content"
import pageMetadata from "@/lib/pageMetadata"
import { formatDate } from "@/lib/formatDate"
import Link from "next/link"
import { DocumentRenderer } from "@keystatic/core/renderer"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

export async function generateMetadata(): Promise<Metadata> {
  const { metaTitle, metaDescription } = await readSingleton("academyTerms")

  return pageMetadata({
    title: metaTitle,
    description: metaDescription,
    path: "/academy/terms",
  })
}

export default async function AcademyTerms() {
  const { title, intro, lastUpdated, body } = await readSingleton(
    "academyTerms",
    { resolveLinkedFiles: true },
  )

  return (
    <main className="bg-lighter text-darker md:px-col-inner px-8 py-12 md:py-20 2xl:py-32">
      <div className="mx-auto max-w-screen-2xl space-y-8 md:space-y-12 2xl:space-y-16">
        <div className="space-y-4 md:space-y-6">
          <Link
            href="/academy"
            className="hover:text-darker/80 inline-flex items-center gap-2 text-base transition-colors lg:text-lg xl:text-xl"
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

          <p className="text-darker/80 text-base lg:text-lg xl:text-xl">
            Last updated on {formatDate(lastUpdated)}
          </p>

          {intro && (
            <p className="max-w-[70ch] text-base sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {intro}
            </p>
          )}
        </div>

        <article className="prose prose-lg text-darker xl:prose-xl marker:text-darker prose-headings:font-serif prose-headings:text-darker prose-p:text-darker prose-a:text-darker prose-strong:text-darker prose-li:text-darker max-w-[80ch]">
          <DocumentRenderer document={body} />
        </article>
      </div>
    </main>
  )
}
