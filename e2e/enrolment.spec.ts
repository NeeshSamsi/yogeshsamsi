import { test, expect } from "@playwright/test"
import fs from "node:fs"
import path from "node:path"

const academy = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/data/academy.json"), "utf-8"),
)

// The Google Form the enrolment action redirects to on success. Bento is
// stubbed via BENTO_DISABLED (see src/lib/bento.ts and playwright.config.ts),
// but this redirect is a real external URL - fulfilled locally below so the
// test never leaves localhost.
const FORM_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLSdmgWLRAFY8PxtzH8MF3UxAauI2QCRUwiYjVVbMS0htUwgOQA/viewform"

test.skip(
  !academy.active,
  "Enrolment is closed in the CMS (academy.active is false) - the Enroll Now button does not render.",
)

test("enrolment dialog validates and redirects to the registration form", async ({
  page,
}) => {
  await page.route(`${FORM_BASE}**`, (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<html><body>mock registration form</body></html>",
    }),
  )

  await page.goto("/academy")
  await page.getByRole("button", { name: "Enroll Now" }).first().click()

  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()

  // validation fires on empty submit
  await dialog.getByRole("button", { name: "Continue" }).click()
  await expect(dialog.getByText("Full name is required.")).toBeVisible()

  // terms link is present and points at the right place
  await expect(
    dialog.getByRole("link", { name: /Terms of Service/i }),
  ).toHaveAttribute("href", "/academy/terms")

  await dialog.getByLabel("Full name").fill("Test Person")
  await dialog.getByLabel("Email address").fill("test@example.com")
  await dialog.getByRole("button", { name: "Continue" }).click()

  // registerAcademy (src/app/actions/academy.ts) always redirects to the
  // Google Form on success - Bento's audience:academy tag only means
  // "expressed interest," not "completed enrolment," so there's no
  // reliable signal to show an "already enrolled" state instead.
  await page.waitForURL(`${FORM_BASE}**`)
  expect(page.url()).toContain(encodeURIComponent("test@example.com"))
})
