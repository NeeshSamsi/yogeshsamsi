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
