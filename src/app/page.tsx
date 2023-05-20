import * as config from "@/lib/config"
import Image from "next/image"
import Button from "@/components/Button"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"

export default async function Home() {
  const { imgSrc, mobileImgSrc } = config.content.home.hero
  return (
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
  )
}
