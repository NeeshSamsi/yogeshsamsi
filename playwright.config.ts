import { defineConfig } from "@playwright/test"

const PORT = 3100

export default defineConfig({
  testDir: "e2e",
  // visual.spec.ts is the Tailwind 4 regression harness and belongs to
  // playwright.visual.config.ts alone. Its baselines are gitignored and
  // machine-specific (macOS font hinting != CI Linux), so collecting it here
  // would fail CI's e2e job on a missing-snapshot error.
  testIgnore: "visual.spec.ts",
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    // Test the production build, not dev. Runs on 3100 - port 3000 is
    // occupied by the local dev server, which must keep running.
    command: `pnpm build && pnpm exec next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      // Server actions call Bento server-side, so page.route cannot mock
      // them - this short-circuits src/lib/bento.ts to stubbed responses
      // instead, so the suite never writes to the live mailing list.
      BENTO_DISABLED: "1",
      // src/lib/botCheck.ts rejects a submit that lands faster than a human
      // could plausibly fill the form - Playwright's scripted fills are
      // always faster than that, so without this every form-submitting spec
      // would hit the bot fake-success path instead of the real one.
      BOT_CHECK_DISABLED: "1",
    },
  },
})
