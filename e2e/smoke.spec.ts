import { test, expect } from "@playwright/test"

// Catches a Keystatic content change that breaks a page - the single most
// likely production break given the CMS-driven workflow.
test("key pages render", async ({ page }) => {
  for (const path of [
    "/",
    "/about",
    "/gallery",
    "/academy",
    "/academy/terms",
    "/masterclass",
  ]) {
    const res = await page.goto(path)
    expect(res?.status(), `${path} did not return 200`).toBe(200)
    await expect(page.locator("h1")).toBeVisible()
  }
})
