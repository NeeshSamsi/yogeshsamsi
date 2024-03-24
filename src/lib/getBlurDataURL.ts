import fs from "node:fs"
import path from "node:path"

import reader from "@/lib/keystatic"
import { getPlaiceholder } from "plaiceholder"

export default async function getBlurDataURL(imageUrl: string) {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  // const url =
  //   process.env.NODE_ENV === "production"
  //     ? settings.url
  //     : "http://localhost:3000"

  try {
    // const res = await fetch(url + imageUrl)

    // if (!res.ok) {
    //   throw new Error(
    //     `Failed to fetch image from ${url}${imageUrl}: ${res.status} ${res.statusText}`,
    //   )
    // }

    // const buffer = await res.arrayBuffer()

    const imageBuffer = fs.readFileSync(
      path.join(process.cwd(), "public", imageUrl),
    )

    const { base64 } = await getPlaiceholder(Buffer.from(imageBuffer))

    return base64
  } catch (error) {
    // throw new Error(`Failed to fetch image from ${url}${imageUrl}`)
    throw new Error(`Failed to fetch image from ${imageUrl}`)
  }
}
