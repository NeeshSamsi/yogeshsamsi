import { test, expect } from "@playwright/test"

// The footer mailing-list form (src/components/MailingList.tsx) appears on
// every page via the shared (main) layout.
test("footer mailing-list signup validates and subscribes", async ({
  page,
}) => {
  await page.goto("/")

  const form = page.locator("#contact form")

  // validation fires on empty submit
  await form.getByRole("button", { name: "Join now" }).click()
  await expect(page.getByText("Name is required.")).toBeVisible()
  await expect(page.getByText("Email is required.")).toBeVisible()

  await form.getByLabel("Full name").fill("Test Person")
  await form.getByLabel("Email address").fill("test@example.com")
  await form.getByRole("button", { name: "Join now" }).click()

  await expect(
    page.getByText(
      "Please check your inbox and confirm your subscription to Yogesh Samsi Updates.",
    ),
  ).toBeVisible()
})

// Regression test for F2: useFormSubmission used to never clear its 5s
// auto-dismiss setTimeout, so a second submit inside that window left the
// first timer running - and when it fired it wiped the second confirmation
// early. settle() now clears the pending timer before starting a new one.
test("a rapid second signup keeps its confirmation past the first timer", async ({
  page,
}) => {
  await page.goto("/")

  const form = page.locator("#contact form")
  const name = form.getByLabel("Full name")
  const email = form.getByLabel("Email address")
  const confirmation = page.getByText(
    "Please check your inbox and confirm your subscription to Yogesh Samsi Updates.",
  )

  // First signup - succeeds and arms the hook's 5s auto-dismiss timer.
  await name.fill("First Person")
  await email.fill("first@example.com")
  await form.getByRole("button", { name: "Join now" }).click()
  await expect(confirmation).toBeVisible()
  await expect(name).toHaveValue("") // onSubmit resolved: RHF reset() ran

  const firstConfirmedAt = Date.now()

  // Second signup ~2s later, comfortably inside the first timer's window.
  // Once a message shows, the submit button is replaced by the confirmation
  // text, so a second click isn't possible here - requestSubmit() drives the
  // same handleSubmit path a fast double-submit would hit.
  await page.waitForTimeout(2000)
  await name.fill("Second Person")
  await email.fill("second@example.com")
  await form.evaluate((f: HTMLFormElement) => f.requestSubmit())
  await expect(name).toHaveValue("") // second onSubmit resolved

  // Sit past the FIRST timer's 5s deadline. Before the fix its uncleared
  // timeout fires around here and resets the form to idle, wiping this second
  // confirmation; with the fix settle() cancelled it and the second timer
  // (~7s from firstConfirmedAt) is still pending.
  await page.waitForTimeout(3500)
  expect(
    Date.now() - firstConfirmedAt,
    "check must land after the first 5s timer would have fired",
  ).toBeGreaterThan(5000)
  await expect(confirmation).toBeVisible()
})
