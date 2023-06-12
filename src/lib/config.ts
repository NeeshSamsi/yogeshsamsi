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
      alt: "Yogesh Samsi sitting with his tabla",
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
        venue: "Tata Theatre, NCPA, Mumbai",
        ticketed: true,
        url: "https://google.com",
      },
      {
        date: "1 & 2 Nov, 2023",
        title: "Testing Name of Concert/Event",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo tenetur temporibus adipisci ab eveniet porro earum inventore ipsam facere vero.",
        online: true,
        venue: "Nehru Centre, Mumbai",
        ticketed: false,
        url: "https://google.com",
      },
    ],
    press: [
      {
        channel: "Washington Post",
        quote:
          "Samsi performed a virtuosic 70-minute piece that illustrated the various schools, techniques, and features, of tabla music... Impeccably structured yet freely expansive, the performance was as intricate as a Bach fugue and as ecstatic as a rave-club crescendo.",
      },
      {
        channel: "Times of India",
        quote:
          "His padhants were as lucid as the following bols through his fingers, and he won repeated applause form the appreciative audience.",
      },
      {
        channel: "The Hindu",
        quote:
          "Yogesh has emerged as a brilliant and most promising tabla artist. He has already made a mark in the highly competitive music world of Bombay.",
      },
    ],
  },

  about: {
    hero: {
      image: {
        src: "https://iili.io/Hrh4khX.webp",
        alt: "Yogesh Samsi sitting at a park",
      },
      quote: {
        text: "A man who must be one of the best tabalias of our age, Yogesh",
        by: "- The Hindu",
      },
      pdfUrl: "/Yogesh Samsi - Biodata.pdf",
    },
    aboutSection: {
      left: [
        "Recognised in the world today as a leading tabla artiste, exhibiting consummate artistry both as a soloist and accompanist. The son of the renowned vocalist Late Pandit Dinkar Kaikini, Yogesh was initiated into tabla by his father at the tender age of four, and later received guidance under Pandit H.Taranath Rao. However it was under the gifted tutelage of the legendary Ustad Allah Rakha that Yogesh received intense training for twenty three years, maturing into one of the most sought after tabla artistes in India today. His style is marked by an unmatched combination of power, sensitivity, knowledge of tradition, tonal clarity, and aesthetics.",
        "Yogesh has played with many of the top ranking classical instrumentalists, vocalists and dancers of India, including Pt Shivkumar Sharma, Pt Hariprasad Chaurasia, Pt Bhimsen Joshi, Ustad Vilayat Khan, Ustad Amjad Ali Khan, Pt Dinkar Kaikini, and Pt Birju Maharaj. He has also had the privilege of accompanying Ustad Allah Rakha and his son the great maestro Ustad Zakir Hussain in their solo performances.  Apart from accompaniment, Yogesh has performed numerous memorable solo performances in India and abroad. He has been featured in many of the world’s most prestigious venues, including: Carnegie Hall, New York; Kennedy Center, Washington DC; Theatre de la Ville, Paris; Opera House, Sydney; Barbican Centre, London; Bolshoi Theatre, Moskow; Esplanade Theatre, Singapore, to name a few.",
      ],
      right: [
        "Outside of the authentic tradition that he carries forward, Yogesh also embraces collaboration with artists for sounds that fuse music from various world music traditions. In this spirit, he has performed with artists including Taufiq Qureshi, Ranjit Barot, Louis Banks, Shujaat Khan, Karsh Kale, Kayhan Kalhor, and many more.",
        "Besides performing, Yogesh is very committed to educating students and listeners about his art and the rich legacy of the Punjab Gharana. His teachings across the world has created a large number of students, some of whom are also knowledgable performers. In more recent times, to further the exploration and study of Punjab Gharana, Yogesh has continued efforts to revive old compositions of both the Punjab tradition as well as the compositions of Pandit Sushil Kumar Jain.",
        "Yogesh is a member of the advisory board for the music department at Pune University and is a chief advisor for educational activities and promotion of Indian Classical music for the reputed music organisation, Darbar, in London.",
        "Yogesh has currently been appointed as a Guru along with other Gurus like Pt Ulhas Kashalkar, Pt Suresh Talwalkar, Smt N.Rajam and Pt Hariprasad Chaurasia at the Indian Classical Music Gurukul run by the M.I.T group of Institutes In Pune(Loni) which aims at developing professional musicians in the future.",
      ],
    },
    concertHighlights: {
      left: [
        "Sawai Gandharv Festival, Pune",
        "Sapthak Festival, Ahmedabad",
        "Harvallabh Sangeet Sammelan, Jalandhar",
        "Dover Lane Music Festival, Calcutta",
        "Shankar Lal Festival, Delhi",
        "Taansen Samroh, Gwalior",
        "Svanubhava, Chennai & Delhi",
        "Opera House, Sydney",
        "Australian Institute of Music",
        "International Festival of Music, Kuwait",
      ],
      right: [
        "Darbar Festival, UK",
        "St. Xavier's College IMG Festival",
        "Carnegie Hall, New York",
        "Kennedy Center, Washington DC",
        "Concert for the World Bank, Washington DC",
        "Bolshoi Theatre, Moscow",
        "Barbican Centre, London",
        "Theatre de la Ville",
        "Cologne Radio Festival",
      ],
    },
  },

  contact: {
    image: {
      src: "/contact.webp",
      alt: "Yogesh Samsi playing a tabla",
    },
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
