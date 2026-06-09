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
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
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
}

// Sentry's withSentryConfig injects a webpack() function that conflicts with
// Turbopack's module registry and causes persistent HMR failures in dev.
// Runtime error capturing still works via instrumentation.ts in all modes.
// The webpack plugin (source map uploads) only runs for production builds.
if (process.env.NODE_ENV === "production") {
  const { withSentryConfig } = require("@sentry/nextjs")
  module.exports = withSentryConfig(nextConfig, {
    org: "yogesh-samsi",
    project: "website",

    silent: !process.env.CI,

    widenClientFileUpload: true,

    tunnelRoute: "/monitoring",

    disableLogger: true,

    automaticVercelMonitors: true,
  })
} else {
  module.exports = nextConfig
}
