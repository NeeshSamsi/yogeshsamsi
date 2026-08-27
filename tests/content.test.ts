import { existsSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"
import * as Icons from "lucide-react"

import reader from "@/lib/keystatic"
import config from "../keystatic.config"

const singletons = [
  "settings",
  "home",
  "about",
  "gallery",
  "masterclass",
  "academy",
  "academyTerms",
  "contact",
  "welcomeUpdates",
  "stillInterested",
] as const

describe("keystatic singletons", () => {
  for (const name of singletons) {
    it(`${name} reads`, async () => {
      const data = await reader.singletons[name].read()
      expect(data, `singleton "${name}" returned null`).not.toBeNull()
    })
  }
})

describe("keystatic collections", () => {
  it("all events read", async () => {
    for (const { slug } of await reader.collections.events.all()) {
      expect(await reader.collections.events.read(slug)).not.toBeNull()
    }
  })
  it("all testimonials read", async () => {
    for (const { slug } of await reader.collections.testimonials.all()) {
      expect(await reader.collections.testimonials.read(slug)).not.toBeNull()
    }
  })
})

it("every academy feature icon exists in lucide", async () => {
  const academy = await reader.singletons.academy.read()
  for (const item of academy!.features.items) {
    expect(
      Icons,
      `icon "${item.icon}" not found in lucide-react`,
    ).toHaveProperty(item.icon)
  }
})

describe("keystatic navigation", () => {
  it("every navigation key exists", () => {
    const valid = new Set([
      ...Object.keys(config.collections ?? {}),
      ...Object.keys(config.singletons ?? {}),
    ])
    const nav = config.ui!.navigation as Record<string, string[]>
    for (const keys of Object.values(nav))
      for (const k of keys)
        if (k !== "---")
          expect(valid, `nav key "${k}" is not a real entry`).toContain(k)
  })

  it("every collection and singleton appears in navigation", () => {
    const nav = config.ui!.navigation as Record<string, string[]>
    const listed = new Set(Object.values(nav).flat())
    for (const k of [
      ...Object.keys(config.collections ?? {}),
      ...Object.keys(config.singletons ?? {}),
    ])
      expect(
        listed,
        `"${k}" is missing from ui.navigation and hidden from the admin`,
      ).toContain(k)
  })
})

function expectImageExists(p: string) {
  expect(existsSync(join(process.cwd(), "public", p)), `missing ${p}`).toBe(
    true,
  )
}

describe("referenced images exist on disk", () => {
  it("academy hero images exist", async () => {
    const academy = await reader.singletons.academy.read()
    expectImageExists(academy!.hero.heroImage)
    expectImageExists(academy!.hero.heroMobileImage)
  })

  it("home hero images exist", async () => {
    const home = await reader.singletons.home.read()
    expectImageExists(home!.heroImage)
    expectImageExists(home!.heroMobileImage)
  })

  it("about hero image exists", async () => {
    const about = await reader.singletons.about.read()
    expectImageExists(about!.heroImage)
  })

  it("contact image exists", async () => {
    const contact = await reader.singletons.contact.read()
    expectImageExists(contact!.image)
  })

  it("masterclass hero images exist", async () => {
    const masterclass = await reader.singletons.masterclass.read()
    expectImageExists(masterclass!.heroImage)
    expectImageExists(masterclass!.heroMobileImage)
  })

  it("gallery images exist", async () => {
    const gallery = await reader.singletons.gallery.read()
    for (const item of gallery!.images) {
      expectImageExists(item.image)
    }
  })
})
