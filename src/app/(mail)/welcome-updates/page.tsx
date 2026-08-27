import { readSingleton } from "@/lib/content"
import { DocumentRenderer } from "@keystatic/core/renderer"

const WelcomeUpdates = async () => {
  const { heading, body } = await readSingleton("welcomeUpdates", {
    resolveLinkedFiles: true,
  })

  return (
    <main className="bg-lighter text-darker md:px-col-inner px-8 py-12 md:py-20 2xl:py-32">
      <div className="mx-auto max-w-screen-2xl space-y-8 md:space-y-12 2xl:space-y-16">
        <h1 className="3xl:text-5xl font-serif text-3xl leading-relaxed font-bold tracking-wider sm:text-2xl lg:text-3xl xl:text-4xl">
          {heading}
        </h1>

        <article className="prose prose-lg marker:text-darker prose-headings:text-darker prose-p:text-darker prose-a:text-darker prose-strong:text-darker prose-li:text-darker">
          <DocumentRenderer document={body} />
        </article>
      </div>
    </main>
  )
}

export default WelcomeUpdates
