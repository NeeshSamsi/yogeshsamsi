import * as config from "@/lib/config"
import Image from "next/image"
import Button from "@/components/Button"
import Socials from "@/components/Socials"
import { ArrowRightIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline"

export default async function About() {
  const { about } = config.content
  const { hero, aboutSection, concertHighlights } = about
  const { quote, pdfUrl, image } = hero

  return (
    <>
      <main className="gap-8 px-8 py-12 text-dark md:py-20 lg:flex lg:px-0 lg:py-0 lg:pl-col-inner">
        <div className="mx-auto flex flex-col items-center justify-center gap-8 text-center lg:mx-0 lg:items-start lg:gap-6 lg:text-start">
          <h1 className="font-serif text-4xl font-bold leading-relaxed tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl">
            Yogesh Samsi
          </h1>
          <ul className="flex gap-4 lg:gap-6">
            <Socials hoverClr="text-darker/80" sizes="h-8" />
          </ul>
          <div className="max-w-[30ch] space-y-3 text-base font-medium sm:text-lg lg:max-w-none lg:text-lg xl:text-xl">
            <p>&ldquo;{quote.text}&rdquo;</p>
            <p>{quote.by}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-base font-semibold lg:gap-6 lg:text-sm xl:text-lg">
            <Button
              as="link"
              text="Biodata"
              icon={{
                element: <ArrowDownTrayIcon className="stroke-[2.5px]" />,
                sizes: "w-3 sm:w-4 xl:w-5",
              }}
              type="Primary"
              theme="Dark"
              href={`${pdfUrl}`}
              download
            />
            <Button
              as="link"
              text="Gallery"
              icon={{
                element: <ArrowRightIcon className="stroke-[2.5px]" />,
                sizes: "w-3 sm:w-4 xl:w-5",
              }}
              type="Secondary"
              theme="Dark"
              href="/gallery"
            />
          </div>
        </div>
        <div className="aspect[1/1.1] relative hidden h-full w-full lg:block">
          <Image
            src={image.src}
            alt={image.alt}
            height={2354}
            width={2160}
            priority
            className="w-full object-cover lg:h-[85vh]"
          />
        </div>
      </main>

      <section
        role="about"
        className="space-y-12 bg-dark px-8 py-12 text-lighter md:space-y-20 md:px-col-inner md:py-20"
      >
        <h2 className="text-center font-serif text-3xl font-semibold tracking-wide sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
          About Yogesh
        </h2>

        <div className="md:mx-none mx-auto flex max-w-md flex-col gap-8 text-center text-sm sm:text-base md:max-w-none md:flex-row md:text-start md:text-sm lg:text-base xl:text-lg">
          {[aboutSection.left, aboutSection.right].map((paras, i) => (
            <div key={i} className="flex flex-col gap-6 md:w-1/2 lg:gap-8">
              {paras.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
