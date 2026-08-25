import { Analytics } from "@bentonow/bento-node-sdk"

// Stubs out the Bento client when BENTO_DISABLED=1, so the Playwright suite
// can exercise the real server-action code paths without writing to the
// live mailing list. Only set in playwright.config.ts's webServer env.
const bento: Analytics = process.env.BENTO_DISABLED
  ? ({
      V1: {
        Subscribers: { getSubscribers: async () => null },
        Tags: { getTags: async () => [] },
        track: async () => true,
      },
    } as unknown as Analytics)
  : new Analytics({
      authentication: {
        publishableKey: process.env.BENTO_PUBLIC_KEY!,
        secretKey: process.env.BENTO_SECRET_KEY!,
      },
      siteUuid: process.env.BENTO_SITE_ID!,
    })

export default bento
