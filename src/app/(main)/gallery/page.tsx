import Image from "next/image"
import { imageSize } from "image-size"

import reader from "@/lib/keystatic"
import getBlurDataURL from "@/lib/getBlurDataURL"

import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"

type ProcessedImage = {
  src: string
  alt: string
  dimensions: { height: number; width: number }
  blurDataURL: string
}

export async function generateMetadata() {
  const gallery = await reader.singletons.gallery.read()
  if (!gallery) throw new Error("Keystatic Content Not Found - Gallery Page")

  const { metaTitle: title, metaDescription: description } = gallery

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/gallery",
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary",
    },
    themeColor: "#362009",
    alternates: {
      canonical: "/gallery",
    },
  }
}

const Gallery = async () => {
  const gallery = await reader.singletons.gallery.read()
  if (!gallery) throw new Error("Keystatic Content Not Found - Gallery Page")

  const { images: rawImages } = gallery

  const images = await Promise.all(
    rawImages.map(async ({ image, alt }) => {
      const blurDataURL = await getBlurDataURL(image)
      const { height, width } = imageSize(`./public/${image}`)

      if (!height || !width)
        throw new Error(`Failed to get dimensions of image at ${image}`)
      if (!blurDataURL)
        throw new Error(`Failed to get blurDataURL of image at ${image}`)

      const processedImage: ProcessedImage = {
        src: image,
        alt,
        dimensions: { height, width },
        blurDataURL,
      }

      return processedImage
    }),
  )

  return (
    <main className="bg-lighter px-8 py-12 text-dark md:px-col-inner md:py-20 2xl:py-32">
      <div className="mx-auto max-w-screen-2xl space-y-12 md:space-y-20 2xl:space-y-32">
        <h1 className="font-serif text-4xl font-bold leading-relaxed tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
          Gallery
        </h1>

        <div className="columns-1 gap-4 space-y-6 sm:columns-2 xl:columns-3 xl:gap-8 xl:space-y-8 3xl:columns-4">
          {images.map(({ src, alt, dimensions, blurDataURL }, i) => (
            <div
              key={i}
              className="group relative h-full w-full shadow-md shadow-darker/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:shadow-lg"
            >
              <div className="absolute z-0 h-full w-full transition-colors group-hover:bg-darker/60 group-focus-visible:bg-darker/60">
                <div className="absolute bottom-0 flex h-fit w-full items-center justify-between p-4 text-lighter opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <p className="text-base xl:text-lg">
                    {dimensions.width} x {dimensions.height}
                  </p>
                  <a href={src} download>
                    <ArrowDownTrayIcon className="aspect-square w-6 lg:w-8" />
                  </a>
                </div>
              </div>
              <Image
                src={src}
                alt={alt}
                {...dimensions}
                placeholder="blur"
                blurDataURL={blurDataURL}
                sizes=""
                className="z-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Gallery
