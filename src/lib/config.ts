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
  contact: {
    image: {
      src: "/contact.webp",
      alt: "Yogesh Samsi playing a tabla",
    },
  },
}

export const meta = {
  home: {
    title: "Yogesh Samsi",
    description: "",
  },
}
