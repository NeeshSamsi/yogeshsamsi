import { describe, expect, it } from "vitest"

// src/lib/redirects.js is plain CommonJS on purpose - next.config.js
// requires it directly, outside of tsconfig path resolution.
import { buildCampaignRedirects, campaignRedirects } from "@/lib/redirects.js"

describe("campaignRedirects (as shipped)", () => {
  it("builds without throwing and every entry is a temporary redirect", () => {
    const built = buildCampaignRedirects(campaignRedirects)
    expect(built.length).toBe(campaignRedirects.length)
    for (const redirect of built) {
      expect(redirect.permanent).toBe(false)
    }
  })

  it("points the three social slugs at Umami Links, not the raw profile URLs", () => {
    const built = buildCampaignRedirects(campaignRedirects) as {
      source: string
      destination: string
      permanent: boolean
    }[]
    const bySource = Object.fromEntries(built.map((r) => [r.source, r]))

    expect(bySource["/facebook"].destination).toBe(
      "https://umami.neeshsamsi.com/q/ysfacebook",
    )
    expect(bySource["/instagram"].destination).toBe(
      "https://umami.neeshsamsi.com/q/ysinstagram",
    )
    expect(bySource["/youtube"].destination).toBe(
      "https://umami.neeshsamsi.com/q/ysyoutube",
    )
  })
})

describe("buildCampaignRedirects validation", () => {
  it("appends UTM params to an internal destination", () => {
    const [redirect] = buildCampaignRedirects([
      {
        source: "/promo",
        note: "test",
        destination: "/masterclass",
        utm: {
          utm_source: "instagram",
          utm_medium: "social",
          utm_campaign: "test",
        },
      },
    ])
    expect(redirect.destination).toBe(
      "/masterclass?utm_source=instagram&utm_medium=social&utm_campaign=test",
    )
  })

  it("rejects a slug that is not lowercase kebab-case", () => {
    expect(() =>
      buildCampaignRedirects([
        {
          source: "/Promo_2026",
          note: "",
          destination: "/masterclass",
          utm: {
            utm_source: "a",
            utm_medium: "b",
            utm_campaign: "c",
          },
        },
      ]),
    ).toThrow(/kebab-case/)
  })

  it("rejects a duplicate source", () => {
    const entry = {
      source: "/promo",
      note: "",
      destination: "/masterclass",
      utm: { utm_source: "a", utm_medium: "b", utm_campaign: "c" },
    }
    expect(() => buildCampaignRedirects([entry, entry])).toThrow(/duplicate/)
  })

  it("rejects an internal destination missing a UTM field", () => {
    expect(() =>
      buildCampaignRedirects([
        {
          source: "/promo",
          note: "",
          destination: "/masterclass",
          utm: { utm_source: "a", utm_medium: "", utm_campaign: "c" },
        },
      ]),
    ).toThrow(/utm_source, utm_medium, or utm_campaign/)
  })

  it("rejects an external destination that is not an Umami Link", () => {
    expect(() =>
      buildCampaignRedirects([
        {
          source: "/promo",
          note: "",
          destination: "https://instagram.com/yogesh.samsi",
        },
      ]),
    ).toThrow(/Umami Link/)
  })
})
