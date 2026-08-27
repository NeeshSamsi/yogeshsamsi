import { describe, expect, it } from "vitest"

import { formatDate } from "@/lib/formatDate"

describe("formatDate", () => {
  it("renders the date without timezone drift", () => {
    expect(formatDate("2026-08-25")).toBe("25 August 2026")
  })

  it("does not shift the day", () => {
    // naive `new Date("2026-01-01")` parses as UTC and renders 31 December in IST
    expect(formatDate("2026-01-01")).toBe("1 January 2026")
  })
})
