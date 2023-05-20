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
          <div className="flex flex-wrap items-center gap-2 md:gap-6">
            <Button
              as="link"
              text="Upcoming events"
              icon={<ArrowRightIcon className="stroke-[2.5px]" />}
              type="Primary"
              theme="Light"
              href="/#events"
            />
            <Button
              as="link"
              text="Reach out"
              icon={<ChatBubbleLeftRightIcon />}
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
        <p className="mx-auto max-w-[45ch] text-center font-serif text-xl tracking-wide sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
          {about.main}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  )
}
