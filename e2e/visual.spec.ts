import { test, expect, type Page } from "@playwright/test"
import fs from "node:fs"
import path from "node:path"

// Visual regression harness for the Tailwind 3 -> 4 migration (U8, Solo todo
// 178). See playwright.visual.config.ts for why this is a separate,
// non-CI, local-only suite.
//
// The 3 specs in this directory (smoke/enrolment/mailing-list) assert
// structure - status codes, an h1, a dialog opening, validation firing. None
// of them would notice a migration that silently shifts spacing, colour,
// breakpoints or typography. This spec is the check for that: pixel
// screenshots at every required width, plus the interactive states where a
// Tailwind plugin is most likely to break visibly (mobile nav hamburger,
// dialog enter animation, focus rings).
//
// Usage:
//   pnpm test:visual --update-snapshots   # capture/refresh baselines
//   pnpm test:visual                      # compare against the baselines

const academy = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/data/academy.json"), "utf-8"),
)

// Content is authored in Keystatic Cloud and synced into src/data/**, so the
// only reliable way to get a *real* event slug is to read whatever is
// actually checked in right now - never hardcode one, since a specific
// event's existence and slug both change over time as events come and go.
//
// The `/[eventSlug]` page only exists for events with internal.discriminant
// === true (see src/app/(main)/[eventSlug]/page.tsx's validateEvent/
// getEventsPaths) - "internal" events (masterclasses/lec-dems we host, which
// get a page of content) as opposed to external venue listings (which only
// ever appear as a card on the homepage). This mirrors that filter.
//
// Collection entries can be a flat `<slug>.json` file or a `<slug>/` folder
// with an index.json (Keystatic uses a folder once a document field, like
// this collection's `page` field, needs a linked file) - both are handled
// below since which shape a given entry takes isn't knowable in advance.
function discoverInternalEventSlug(): string | null {
  const dir = path.join(process.cwd(), "src/data/events")
  if (!fs.existsSync(dir)) return null

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const slug = entry.name.replace(/\.json$/, "")
    const jsonPath = entry.isDirectory()
      ? path.join(dir, entry.name, "index.json")
      : path.join(dir, entry.name)

    if (!jsonPath.endsWith(".json") || !fs.existsSync(jsonPath)) continue

    try {
      const raw = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
      if (raw?.internal?.discriminant === true) return slug
    } catch {
      // Not the shape we expected - skip rather than fail the whole suite
      // over one unparsable entry.
      continue
    }
  }

  return null
}

const EVENT_SLUG = discoverInternalEventSlug()

const STATIC_PAGES: { name: string; path: string }[] = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "gallery", path: "/gallery" },
  { name: "academy", path: "/academy" },
  { name: "academy-terms", path: "/academy/terms" },
  { name: "masterclass", path: "/masterclass" },
  { name: "welcome-updates", path: "/welcome-updates" },
  { name: "still-interested", path: "/still-interested" },
  { name: "keystatic", path: "/keystatic" },
]

// Elements to mask per page, keyed by name. Even though none of these are
// truly clock-driven right now (see the report), they are the closest thing
// this site has to non-deterministic content, so they're frozen out on
// principle rather than trusted to stay static forever.
const MASKS: Record<string, (page: Page) => ReturnType<Page["locator"]>[]> = {
  "academy-terms": (page) => [page.getByText(/^Last updated on/)],
}

// Umami's session recorder (src/components/Umami.tsx) only runs in
// production - which this suite tests against - and polls/beacons in the
// background. Left alone, that background traffic can keep the page "busy"
// indefinitely and makes runs slower and less deterministic for no benefit
// (BENTO_DISABLED already establishes the precedent of stubbing outbound
// telemetry for e2e runs). Block it at the network layer rather than waiting
// for it to go quiet.
async function blockTelemetry(page: Page) {
  await page.route("**/u/script.js", (route) => route.abort())
  await page.route("**/u/recorder.js", (route) => route.abort())
  await page.route("https://umami.neeshsamsi.com/**", (route) => route.abort())
}

// Determinism helper: wait past the things that are genuinely async and
// timing-sensitive (fonts, images including blur-up placeholders) rather
// than sleeping a fixed duration, which would be both slower on average and
// still flaky in the worst case.
async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded")

  // next/image sets loading="lazy" on anything without `priority`, which
  // defers the fetch until the browser decides the image is near the
  // viewport. Nothing here ever scrolls before this point, so on
  // image-heavy pages (gallery, academy) most images would never start
  // downloading and the img.complete wait below would hang until the test
  // timeout. Flip lazy images to eager to force the fetch to start now -
  // this is what actually broke the first run of this harness (see report).
  await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      ;(img as HTMLImageElement).loading = "eager"
    })
  })

  await page.evaluate(() => document.fonts.ready)
  await page.waitForFunction(() =>
    Array.from(document.images).every((img) => img.complete),
  )
  // Two animation frames: one for the browser to paint the now-loaded
  // images/fonts, one for React to flush any state update that triggers
  // (e.g. the blur-up placeholder swapping to the real <img>).
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      }),
  )
}

test.beforeEach(async ({ page }) => {
  await blockTelemetry(page)
})

test.describe("static pages", () => {
  for (const { name, path: pagePath } of STATIC_PAGES) {
    test(`page: ${name}`, async ({ page }) => {
      // /keystatic is a client-rendered SPA shell (see keystatic.tsx) that
      // talks to Keystatic Cloud to resolve auth state before it settles on
      // its "Log in with Keystatic Cloud" screen - give it more room than
      // the default navigation timeout.
      const res = await page.goto(pagePath, {
        timeout: name === "keystatic" ? 30_000 : undefined,
      })
      expect(res?.status(), `${pagePath} did not return 200`).toBe(200)

      if (name === "keystatic") {
        await page.waitForLoadState("networkidle", { timeout: 20_000 })
      } else {
        await settle(page)
      }

      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        mask: MASKS[name]?.(page),
      })
    })
  }

  test("page: event-detail", async ({ page }) => {
    test.skip(
      !EVENT_SLUG,
      "No event with internal.discriminant=true is currently checked into " +
        "src/data/events on this branch (the last one was deleted in " +
        "Nov 2024 - see git log -- src/data/events). This test activates " +
        "itself automatically, no code change needed, the next time an " +
        "internal event (masterclass/lec-dem) exists in the CMS content.",
    )

    const res = await page.goto(`/${EVENT_SLUG}`)
    expect(res?.status(), `/${EVENT_SLUG} did not return 200`).toBe(200)
    await settle(page)

    await expect(page).toHaveScreenshot("event-detail.png", {
      fullPage: true,
    })
  })
})

test.describe("interactive states", () => {
  // Fixed-position overlays (the dialog's overlay/content) render relative
  // to whatever viewport is active at capture time. Playwright's fullPage
  // screenshots temporarily resize the page to its full scrollable height to
  // capture it, which would re-center a `position: fixed` dialog against
  // that inflated height instead of the real viewport - so these stay
  // viewport-sized (fullPage left at its default false) rather than full
  // page, unlike the static-page screenshots above.

  test("state: mobile nav open", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "375",
      "the hamburger nav (Navbar.tsx) only renders below the md (769px) breakpoint - meaningless to open at the other widths",
    )

    await page.goto("/")
    await settle(page)

    // tailwind-hamburgers' generated markup - no accessible role/name to
    // query by, so this is the one interactive-state selector that isn't
    // reused from the existing specs.
    await page.locator(".tham").click()
    await expect(page.locator("nav")).toHaveClass(/h-screen/)

    await expect(page).toHaveScreenshot("mobile-nav-open.png")
  })

  test("state: enrolment dialog open", async ({ page }) => {
    test.skip(
      !academy.active,
      "Enrolment is closed in the CMS (academy.active is false) - the Enroll Now button does not render.",
    )

    await page.goto("/academy")
    await settle(page)

    await page.getByRole("button", { name: "Enroll Now" }).first().click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()

    await expect(page).toHaveScreenshot("enrolment-dialog-open.png")
  })

  test("state: form input focused", async ({ page }) => {
    // The footer mailing-list form (src/components/MailingList.tsx) appears
    // on every page via the shared (main) layout, so this exercises the
    // same focus-within/border treatment shared by every text input on the
    // site (AcademyRegistration, ContactForm, MailingList all use the same
    // FloatingLabelInput classes).
    await page.goto("/")
    await settle(page)

    await page.locator("#contact form").getByLabel("Full name").focus()

    // caret defaults to "hide" on toHaveScreenshot, which is exactly what's
    // needed here - native text-cursor blink isn't a CSS animation, so it
    // isn't touched by animations:"disabled", and would otherwise race a
    // ~530ms blink cycle.
    await expect(page).toHaveScreenshot("form-input-focused.png")
  })
})
