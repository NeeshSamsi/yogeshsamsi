import { defineConfig } from "@playwright/test"

const PORT = 3200

// Visual regression harness for the Tailwind 3 -> 4 migration (U8, Solo todo
// 178). Deliberately separate from playwright.config.ts:
//
// - Different port (3200) - the main e2e config owns 3100, dev owns 3000.
// - Not run by `pnpm test:e2e` and not wired into CI. Baselines are captured
//   on whatever OS runs this locally (macOS renders fonts differently to
//   CI's Linux runners), so a baseline committed from one platform will not
//   compare cleanly on another. This is a local pre/post-migration tool: run
//   it, capture Tailwind-3 baselines, do the migration, run it again against
//   the same baselines, inspect every diff.
// - Runs against a production build (`next start`), matching the main e2e
//   config, so screenshots reflect what actually ships rather than a dev
//   build with HMR overlays / different chunking.
export default defineConfig({
  testDir: "e2e",
  testMatch: "visual.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"]],
  outputDir: "test-results-visual",
  timeout: 45_000,

  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      // Justification for 0.02 (2%): this site is built almost entirely from
      // flat fills, solid borders and system/web fonts - no photographic
      // gradients or noisy textures where anti-aliasing drift needs a wider
      // budget. 2% is loose enough to absorb a handful of sub-pixel
      // anti-aliasing/font-hinting differences between runs on the same
      // machine, but tight enough that a real Tailwind-4 spacing, colour or
      // breakpoint regression (which moves whole blocks of pixels, not
      // single edges) will still fail the comparison.
      maxDiffPixelRatio: 0.02,
      // Playwright's mechanism for freezing CSS animations/transitions to
      // their end state immediately before capture - handles the nav
      // clip-path animation and the dialog's enter animation without racing
      // real timers.
      animations: "disabled",
    },
  },

  use: {
    baseURL: `http://localhost:${PORT}`,
    // Fixed at 1 so screenshots are pixel-for-pixel comparable across runs -
    // a Retina/HiDPI default here would double every dimension and make
    // baselines machine-dependent.
    deviceScaleFactor: 1,
    viewport: { width: 1280, height: 900 },
    trace: "off",
    video: "off",
    screenshot: "off",
  },

  webServer: {
    command: `pnpm build && pnpm exec next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      // See playwright.config.ts - same reasoning, stub Bento so the suite
      // never writes to the live mailing list.
      BENTO_DISABLED: "1",
    },
  },

  // One project per required width. Viewport height is fixed and mostly
  // irrelevant - static-page screenshots use fullPage:true, so only the
  // width drives layout.
  projects: [
    { name: "375", use: { viewport: { width: 375, height: 900 } } },
    { name: "768", use: { viewport: { width: 768, height: 900 } } },
    { name: "1280", use: { viewport: { width: 1280, height: 900 } } },
    { name: "1920", use: { viewport: { width: 1920, height: 1080 } } },
  ],
})
