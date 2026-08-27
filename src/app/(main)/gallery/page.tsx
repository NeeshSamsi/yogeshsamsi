import fs from "node:fs"
import path from "node:path"

import Image from "next/image"
import { imageSize } from "image-size"

import { readSingleton } from "@/lib/content"
import pageMetadata from "@/lib/pageMetadata"
import getBlurDataURL from "@/lib/getBlurDataURL"

import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"

type ProcessedImage = {
  src: string
  alt: string
  dimensions: { height: number; width: number }
  blurDataURL: string
}

export async function generateMetadata() {
  const { metaTitle: title, metaDescription: description } =
    await readSingleton("gallery")

  return pageMetadata({ title, description, path: "/gallery" })
}

const Gallery = async () => {
  const { images: rawImages } = await readSingleton("gallery")

  const images = await Promise.all(
    rawImages.map(async ({ image, alt }) => {
      const blurDataURL = await getBlurDataURL(image)

      const imageBuffer = fs.readFileSync(
        path.join(process.cwd(), "public", image),
      )
      const { height, width } = imageSize(imageBuffer as unknown as Uint8Array)

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
    <main className="bg-lighter text-dark md:px-col-inner px-8 py-12 md:py-20 2xl:py-32">
      <div className="mx-auto max-w-screen-2xl space-y-12 md:space-y-20 2xl:space-y-24">
        <h1 className="3xl:text-7xl font-serif text-4xl leading-relaxed font-bold tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl">
          Gallery
        </h1>

        {/* Tailwind 4 changed space-y-* from `> :not([hidden]) ~ :not([hidden])`
            (margin-top) to `> :not(:last-child)` (margin-bottom). Inside a
            multi-column masonry that redistributes spacing at every column
            break and shifts the whole grid. `[&>*+*]:mt-*` reproduces the v3
            selector exactly, so the layout stays put. */}
        <div className="3xl:columns-4 min-h-screen columns-1 gap-4 sm:columns-2 xl:columns-3 xl:gap-8 [&>*+*]:mt-6 xl:[&>*+*]:mt-8">
          {images.length > 0 ? (
            images.map(({ src, alt, dimensions, blurDataURL }, i) => (
              <div
                key={i}
                className="group shadow-darker/20 relative h-full w-full shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:shadow-lg"
              >
                <div className="group-hover:bg-darker/60 group-focus-visible:bg-darker/60 absolute z-0 h-full w-full transition-colors">
                  <div className="text-lighter absolute bottom-0 flex h-fit w-full items-center justify-between p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <p className="text-base xl:text-lg">
                      {dimensions.width} x {dimensions.height}
                    </p>
                    <a href={src} download aria-label="Download image">
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
            ))
          ) : (
            <p>No images to show.</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default Gallery
