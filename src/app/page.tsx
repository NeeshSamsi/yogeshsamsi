import * as config from "@/lib/config"
import Image from "next/image"
import Button from "@/components/Button"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"

export default async function Home() {
  const { home } = config.content
  const { hero, about, events, press } = home
  const { imgSrc, mobileImgSrc } = hero

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
        />
        <Image
          src={mobileImgSrc}
          alt="Background image of Yogesh Samsi"
          className="-z-10 block h-full w-full object-cover object-top md:hidden"
          fill
          priority
          sizes="100vw"
        />
        <div className="flex flex-col items-center gap-8 pt-12 md:items-start md:pt-0 xl:gap-12 2xl:gap-16 3xl:gap-20">
          <h1 className="font-serif text-4xl font-semibold tracking-wider sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl">
            Yogesh Samsi
          </h1>
          <div className="space-y-6 text-sm sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:space-y-8 2xl:text-2xl 3xl:space-y-10 3xl:text-3xl">
            <div className="flex flex-wrap items-center gap-2 md:gap-6">
              <Button
                as="link"
                text="Upcoming events"
                icon={{
                  element: <ArrowRightIcon className="stroke-[2.5px]" />,
                  sizes: "w-4 sm:w-5 xl:w-6 3xl:w-8",
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
                  sizes: "w-4 sm:w-5 xl:w-6 3xl:w-8",
                }}
                type="Secondary"
                theme="Light"
                href="/contact"
              />
            </div>
            <p className="text-light">
              Are you an organiser?{" "}
              <a
                href="/about"
                className="underline underline-offset-2 transition-colors hover:text-lighter"
              >
                Download Biodata
              </a>
            </p>
          </div>
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
              <h3 className="font-serif text-lg font-semibold tracking-wide sm:text-xl md:text-lg lg:text-xl xl:text-2xl">
                {card.title}
              </h3>
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

        <div className="mx-auto grid max-w-md gap-x-12 gap-y-8 lg:max-w-none lg:grid-cols-2 xl:gap-x-16 xl:gap-y-12">
          {events.map(
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

      <section
        role="Press quotes"
        className="space-y-16 bg-lighter px-8 pb-12 pt-24 text-lighter md:space-y-20 md:px-col-inner md:pb-20 md:pt-32"
      >
        {press.map(({ channel, quote }, i) => (
          <div
            key={i}
            className="mx-auto w-full max-w-md bg-dark px-12 shadow-lg shadow-dark/50 lg:max-w-none"
          >
            <div className="flex -translate-y-10 flex-col items-center gap-4 lg:-translate-y-12">
              <Image
                src={`/${channel}.png`}
                alt={`${channel} Logo`}
                height={220}
                width={220}
                className="aspect-square w-20 rounded-full lg:w-24"
              />
              <div className="mb-6 flex max-w-3xl items-center justify-between gap-8">
                <div className="hidden aspect-square h-28 text-light lg:block">
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
                <div className="hidden h-36 w-1 bg-lighter lg:block" />
                <h4 className="h-fit text-center text-base sm:text-lg md:text-base lg:text-start lg:text-lg xl:text-xl">
                  {quote}
                </h4>
              </div>
              <h3 className="font-serif text-lg font-semibold sm:text-xl md:text-lg lg:text-xl xl:text-2xl">
                {channel}
              </h3>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
