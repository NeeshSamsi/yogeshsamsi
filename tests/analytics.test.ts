import { describe, expect, it } from "vitest"

import { track, umamiEventAttrs } from "@/lib/analytics"

describe("umamiEventAttrs", () => {
  it("builds a data-umami-event attribute per key, stringified", () => {
    expect(
      umamiEventAttrs("social-click", { platform: "YouTube", location: "nav" }),
    ).toEqual({
      "data-umami-event": "social-click",
      "data-umami-event-platform": "YouTube",
      "data-umami-event-location": "nav",
    })
  })

  it("omits keys whose value is undefined", () => {
    expect(
      umamiEventAttrs("contact-click", {
        email: undefined as unknown as string,
      }),
    ).toEqual({ "data-umami-event": "contact-click" })
  })

  it("returns only the event name attribute for an empty data object", () => {
    expect(umamiEventAttrs("academy-register", {})).toEqual({
      "data-umami-event": "academy-register",
    })
  })
})

describe("track", () => {
  it("never throws, including on the server where window is undefined", () => {
    expect(() => track("not-found", { path: "/x", referrer: "" })).not.toThrow()
  })
})
