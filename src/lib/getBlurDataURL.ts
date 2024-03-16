import { getPlaiceholder } from "plaiceholder"
import reader from "@/lib/keystatic"

export default async function getBlurDataURL(imageUrl: string) {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const url =
    process.env.NODE_ENV === "production"
      ? settings.url
      : "http://localhost:3000"

  try {
    const res = await fetch(url + imageUrl)

    if (!res.ok) {
      throw new Error(
        `Failed to fetch image from ${url}${imageUrl}: ${res.status} ${res.statusText}`,
      )
    }

    const buffer = await res.arrayBuffer()

    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    return base64
  } catch (error) {
    throw new Error(`Failed to fetch image from ${url}${imageUrl}`)
  }
}
