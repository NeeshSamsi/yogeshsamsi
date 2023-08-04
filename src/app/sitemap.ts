import type { MetadataRoute } from "next"
import reader from "@/lib/keystatic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings.")

  const { url, navLinks } = settings

  const pageUrls = navLinks.map(({ path }) => ({
    url: `${url}${path}`,
    lastModified: new Date(),
  }))

  return [...pageUrls]
}
