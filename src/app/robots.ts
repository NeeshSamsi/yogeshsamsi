import type { MetadataRoute } from "next"
import { readSingleton } from "@/lib/content"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { url } = await readSingleton("settings")

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/keystatic/"],
    },
    sitemap: `${url}/sitemap.xml`,
  }
}
