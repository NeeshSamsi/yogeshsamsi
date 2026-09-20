import { beforeEach, describe, expect, it } from "vitest"

import { isBotSubmission } from "@/lib/botCheck"

describe("isBotSubmission", () => {
  beforeEach(() => {
    delete process.env.BOT_CHECK_DISABLED
  })

  it("flags a filled honeypot regardless of timing", () => {
    expect(isBotSubmission("Acme Inc", Date.now())).toBe(true)
  })

  it("flags a submit that lands faster than a human could fill the form", () => {
    expect(isBotSubmission(undefined, Date.now())).toBe(true)
  })

  it("passes a genuine submit with an empty honeypot and enough elapsed time", () => {
    expect(isBotSubmission(undefined, Date.now() - 2000)).toBe(false)
  })

  it("treats an empty-string honeypot the same as an unfilled one", () => {
    expect(isBotSubmission("", Date.now() - 2000)).toBe(false)
  })

  it("is bypassed entirely when BOT_CHECK_DISABLED is set (playwright.config.ts)", () => {
    process.env.BOT_CHECK_DISABLED = "1"
    expect(isBotSubmission("Acme Inc", Date.now())).toBe(false)
  })
})
