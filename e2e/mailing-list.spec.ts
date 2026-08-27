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
