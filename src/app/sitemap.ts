import type { MetadataRoute } from "next"
import { readSingleton } from "@/lib/content"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { url, navLinks } = await readSingleton("settings")

  const pageUrls = navLinks.map(({ path }) => ({
    url: `${url}${path}`,
    lastModified: new Date(),
  }))

  return [...pageUrls]
}
