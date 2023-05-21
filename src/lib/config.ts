let inDevEnv
process && process.env.NODE_ENV === "development"
  ? (inDevEnv = true)
  : (inDevEnv = false)

export const dev = inDevEnv

type NavLink = { text: string; path: string; newWindow?: boolean }
export const navLinks: NavLink[] = [
  { text: "Home", path: "/" },
  { text: "About", path: "/about" },
  { text: "Gallery", path: "/gallery" },
  { text: "Schedule", path: "/schedule" },
  { text: "Learn", path: "/learn" },
  { text: "Contact", path: "/contact" },
]

type Social = { platform: "Instagram" | "YouTube" | "Facebook"; link: string }
export const socials: Social[] = [
  { platform: "YouTube", link: "https://youtube.com/@YogeshSamsiOfficial" },
  { platform: "Instagram", link: "https://instagram.com/yogesh.samsi" },
  { platform: "Facebook", link: "https://facebook.com/PanditYogeshSamsi" },
]

// General Settings
export const url = !dev ? "https://yogeshsamsi.com" : "http://localhost:3000"
export const author = "Yogesh Samsi"
export const email = "yogeshsamsiofficial@gmail.com"
export const twitterUsername = ""

export const content = {
  home: {
    hero: {
      imgSrc: "https://iili.io/HgRpSbn.webp",
      mobileImgSrc: "https://iili.io/Hg5CZ67.webp",
    },
    about: {
      main: "A unique tabla artist who has simultaneously scaled unprecedented heights of achievement in solo performance, accompaniment, and pedagogy.",
      soloist:
        "Combines tradition & innovation in Punjab Gharana, mastering a vast repertoire. He revives lost partition-era treasures and presents a fresh perspective that captures Ustad Allah Rakha's philosophy and rhythmic essence.",
      accompanist:
        "Provides sensitive and thoughtful tabla accompaniment to leading vocalists and instrumentalists, reflecting his refined approach groomed under his father, stalwart vocalist Pandit Dinkar Kaikini.",
      guru: "Dedicated to the future of tabla in his role as a Guru, guiding a new generation of accomplished professionals. His pedagogical approach fosters creative, independent thinkers to propagate and evolve the Gharana.",
    },
    events: [
      {
        date: "1 & 2 Nov, 2023",
        title: "Testing Name of Concert/Event",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo tenetur temporibus adipisci ab eveniet porro earum inventore ipsam facere vero.",
        online: false,
        venue: "Name of Auditorium",
        ticketed: false,
        url: "https://google.com",
      },
      {
        date: "1 & 2 Nov, 2023",
        title: "Testing Name of Concert/Event",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo tenetur temporibus adipisci ab eveniet porro earum inventore ipsam facere vero.",
        online: false,
        venue: "Name of Auditorium",
        ticketed: false,
        url: "https://google.com",
      },
      {
        date: "1 & 2 Nov, 2023",
        title: "Testing Name of Concert/Event",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo tenetur temporibus adipisci ab eveniet porro earum inventore ipsam facere vero.",
        online: false,
        venue: "Name of Auditorium",
        ticketed: true,
        url: "https://google.com",
      },
      {
        date: "1 & 2 Nov, 2023",
        title: "Testing Name of Concert/Event",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo tenetur temporibus adipisci ab eveniet porro earum inventore ipsam facere vero.",
        online: true,
        venue: "Name of Auditorium",
        ticketed: false,
        url: "https://google.com",
      },
    ],
    press: [
      {
        channel: "",
        quote: "",
      },
      {
        channel: "",
        quote: "",
      },
      {
        channel: "",
        quote: "",
      },
    ],
  },

  footer: {
    mailingList: {
      heading: "Join the Mailing List",
      subheading: "Receive updates on schedule, content & upcoming events.",
    },
    contactHeading: "Find me here:",
  },
}

export const meta = {
  home: {
    title: "Yogesh Samsi",
    description: "",
  },
}
