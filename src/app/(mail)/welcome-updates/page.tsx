import reader from "@/lib/keystatic"
import { DocumentRenderer } from "@keystatic/core/renderer"

const WelcomeUpdates = async () => {
  const welcomeUpdates = await reader.singletons.welcomeUpdates.read({
    resolveLinkedFiles: true,
  })
  if (!welcomeUpdates)
    throw new Error("Keystatic Content Not Found - Welcome Updates Page")

  const { heading, body } = welcomeUpdates

  return (
    <main className="bg-lighter px-8 py-12 text-dark md:px-col-inner md:py-20 2xl:py-32">
      <div className="mx-auto max-w-screen-2xl space-y-8 md:space-y-12 2xl:space-y-16">
        <h1 className="font-serif text-3xl font-bold leading-relaxed tracking-wider sm:text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl">
          {heading}
        </h1>

        <article className="prose prose-lg marker:text-dark">
          <DocumentRenderer document={body} />
        </article>
      </div>
    </main>
  )
}

export default WelcomeUpdates
