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
]

/** @type {import('next').NextConfig} */
// module.exports = withPlaiceholder({
module.exports = {
  async redirects() {
    return [
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
          "https://umami.neeshsamsi.com/websites/cc681e71-31cf-4b34-8101-c5926a8fef1f",
        permanent: true,
      },
      ...socialRedirects,
    ]
  },
}
// })
