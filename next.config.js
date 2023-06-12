// const { withPlaiceholder } = require("@plaiceholder/next")

/** @type {import('next').NextConfig} */
// module.exports = withPlaiceholder({
module.exports = {
  images: {
    domains: ["iili.io"],
  },
  async redirects() {
    return [
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
  },
}
// })
