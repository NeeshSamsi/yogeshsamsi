import { Analytics } from "@bentonow/bento-node-sdk"
import { be } from "zod/v4/locales"

const bento = new Analytics({
  authentication: {
    publishableKey: process.env.BENTO_PUBLIC_KEY!,
    secretKey: process.env.BENTO_SECRET_KEY!,
  },
  siteUuid: process.env.BENTO_SITE_ID!,
})

export default bento
