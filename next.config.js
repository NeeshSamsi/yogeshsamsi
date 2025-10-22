const socialRedirects = [
  {
    source: "/facebook",
    destination: "https://facebook.com/PanditYogeshSamsi",
    permanent: true,
  },
  {
    source: "/instagram",
    destination: "https://instagram.com/yogesh.samsi",
    permanent: true,
  },
  {
    source: "/youtube",
    destination: "https://youtube.com/@YogeshSamsiOfficial",
    permanent: true,
  },
  {
    source: "/bio",
    destination: "/about",
    permanent: true,
  },
]

/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/schedule",
        destination: "/#events",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/#events",
        permanent: true,
      },
      {
        source: "/stats",
        destination:
          "https://umami.neeshsamsi.com/websites/45d705f2-b44a-45cf-b94e-a8fb619b5fe0",
        permanent: true,
      },
      ...socialRedirects,
    ]
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/public/files/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET",
  //         },
  //       ],
  //     },
  //   ]
  // },
}

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs")

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "yogesh-samsi",
  project: "website",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})
