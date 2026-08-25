import { describe, expect, it } from "vitest"

import {
  contactFormSchema,
  mailingListSchema,
  masterclassFormSchema,
} from "@/lib/zodSchemas"

describe("masterclassFormSchema (academy + masterclass enrolment)", () => {
  it("accepts a valid submission", () => {
    expect(
      masterclassFormSchema.safeParse({ name: "Asha R", email: "a@b.com" })
        .success,
    ).toBe(true)
  })
  it("rejects an empty name", () => {
    const r = masterclassFormSchema.safeParse({ name: "", email: "a@b.com" })
    expect(r.success).toBe(false)
    expect(r.error!.issues[0].message).toBe("Full name is required.")
  })
  it.each(["notanemail", "a@", "@b.com", "a b@c.com"])(
    "rejects %s",
    (email) => {
      expect(
        masterclassFormSchema.safeParse({ name: "Asha", email }).success,
      ).toBe(false)
    },
  )
})

describe("mailingListSchema", () => {
  it("accepts a valid submission", () => {
    expect(
      mailingListSchema.safeParse({ mlName: "Asha R", mlEmail: "a@b.com" })
        .success,
    ).toBe(true)
  })
  it("rejects an empty name", () => {
    const r = mailingListSchema.safeParse({ mlName: "", mlEmail: "a@b.com" })
    expect(r.success).toBe(false)
    expect(r.error!.issues[0].message).toBe("Name is required.")
  })
  it.each(["notanemail", "a@", "@b.com", "a b@c.com"])(
    "rejects %s",
    (mlEmail) => {
      expect(
        mailingListSchema.safeParse({ mlName: "Asha", mlEmail }).success,
      ).toBe(false)
    },
  )
})

describe("contactFormSchema", () => {
  it("accepts a valid submission", () => {
    expect(
      contactFormSchema.safeParse({
        name: "Asha R",
        email: "a@b.com",
        message: "Hello there",
      }).success,
    ).toBe(true)
  })
  it("rejects an empty name", () => {
    const r = contactFormSchema.safeParse({
      name: "",
      email: "a@b.com",
      message: "Hello there",
    })
    expect(r.success).toBe(false)
    expect(r.error!.issues[0].message).toBe("Full name is required.")
  })
  it("rejects an empty message", () => {
    const r = contactFormSchema.safeParse({
      name: "Asha",
      email: "a@b.com",
      message: "",
    })
    expect(r.success).toBe(false)
    expect(r.error!.issues[0].message).toBe("Message is required.")
  })
  it.each(["notanemail", "a@", "@b.com", "a b@c.com"])(
    "rejects %s",
    (email) => {
      expect(
        contactFormSchema.safeParse({
          name: "Asha",
          email,
          message: "Hello there",
        }).success,
      ).toBe(false)
    },
  )
})
