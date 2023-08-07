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
      ...socialRedirects,
    ]
  },
}
// })
