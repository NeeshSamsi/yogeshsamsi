import * as config from "@/lib/config"
import Image from "next/image"
import Button from "@/components/Button"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"

export default async function Home() {
  const { imgSrc, mobileImgSrc } = config.content.home.hero

  const { about } = config.content.home

  return (
    <>
      <main className="relative aspect-[1/1.6] w-screen px-8 text-center text-lighter md:flex md:aspect-[1/0.52] md:min-h-[75vh] md:items-center md:px-col-inner md:text-start">
        <Image
          src={imgSrc}
          alt="Background image of Yogesh Samsi"
          className="-z-10 hidden object-cover md:block"
          fill
          priority
          sizes="100vw"
          // placeholder="blur"
          // blurDataURL={}
        />
        <Image
          src={mobileImgSrc}
          alt="Background image of Yogesh Samsi"
          className="-z-10 block h-full w-full object-cover object-top md:hidden"
          fill
          priority
          sizes="100vw"
          // placeholder="blur"
          // blurDataURL={}
        />
        <div className="flex flex-col items-center gap-8 pt-12 md:items-start md:pt-0">
          <h1 className="font-serif text-4xl font-semibold tracking-wider sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl">
            Yogesh Samsi
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-lg md:gap-6 md:text-base lg:text-lg xl:text-xl">
            <Button
              as="link"
              text="Upcoming events"
              icon={{
                element: <ArrowRightIcon className="stroke-[2.5px]" />,
                sizes: "w-4 sm:w-5 xl:w-6",
              }}
              type="Primary"
              theme="Light"
              href="/#events"
            />
            <Button
              as="link"
              text="Reach out"
              icon={{
                element: <ChatBubbleLeftRightIcon />,
                sizes: "w-4 sm:w-5 xl:w-6",
              }}
              type="Secondary"
              theme="Light"
              href="/contact"
            />
          </div>
          <p className="text-sm text-light sm:text-lg md:text-base lg:text-lg xl:text-xl">
            Are you an organiser?{" "}
            <a
              href="/about"
              className="underline underline-offset-2 transition-colors hover:text-lighter"
            >
              Download Biodata
            </a>
          </p>
        </div>
      </main>

      <section
        role="about"
        className="space-y-12 px-8 py-12 md:px-col-inner md:py-20"
      >
        <h2 className="mx-auto max-w-[45ch] text-center font-serif text-xl tracking-wide sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
          {about.main}
        </h2>
        <div className="mx-auto grid max-w-md gap-6 lg:max-w-none lg:grid-cols-3">
          {[
            { title: "As a Soloist", para: about.soloist },
            { title: "As an Accompanist", para: about.accompanist },
            { title: "As a Guru", para: about.guru },
          ].map((card, i) => (
            <div key={i} className="space-y-4 border border-darker p-4">
              <p className="font-serif text-lg font-semibold tracking-wide sm:text-xl md:text-lg lg:text-xl xl:text-2xl">
                {card.title}
              </p>
              <p className="text-base sm:text-lg md:text-base lg:text-lg xl:text-xl">
                {card.para}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        role="Upcoming events"
        className="space-y-12 bg-dark px-8 py-12 text-lighter md:space-y-20 md:px-col-inner md:py-20"
      >
        <h2 className="text-center font-serif text-3xl font-semibold tracking-wide sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
          Upcoming events
        </h2>

        <div className="mx-auto grid max-w-md gap-8 lg:max-w-none lg:grid-cols-2">
          {config.content.home.events.map(
            ({ date, title, description, online, venue, ticketed, url }, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 border border-lighter p-4"
              >
                <p className="w-fit text-xs font-medium uppercase tracking-wider text-light sm:text-sm lg:text-sm xl:text-base">
                  {date}
                </p>
                <h3 className="font-serif text-xl font-semibold tracking-wide sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                  {title}
                </h3>
                <p>{description}</p>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:text-sm lg:text-sm xl:text-base">
                  <p className="font-medium text-light">
                    {!online ? venue : "Online"}
                  </p>
                  <Button
                    as="link"
                    href={url}
                    text="Learn more"
                    type="Primary"
                    theme="Light"
                    icon={{
                      element: <ArrowRightIcon className="stroke-[2.5px]" />,
                      sizes: "w-3 xl:w-4",
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  )
}
