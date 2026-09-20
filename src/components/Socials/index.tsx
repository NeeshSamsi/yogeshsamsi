import type { FC } from "react"
import { socials, type Social } from "./socials"
import Facebook from "./Facebook"
import Instagram from "./Instagram"
import YouTube from "./YouTube"
import { umamiEventAttrs } from "@/lib/analytics"

type Props = {
  hoverClr: string
  sizes: string
  location: "nav" | "footer" | "about-hero"
}

const icons: Record<Social["platform"], FC> = { YouTube, Instagram, Facebook }

const Socials: FC<Props> = ({ hoverClr, sizes, location }) => {
  return (
    <>
      {socials.map(({ platform, link }, i) => {
        const Icon = icons[platform]
        return (
          <li key={i}>
            <a
              href={link}
              target="_blank"
              aria-label={`Link to Yogesh Samsi's ${platform}`}
              className={`block aspect-square transition-colors ${sizes} ${hoverClr}`}
              {...umamiEventAttrs("social-click", { platform, location })}
            >
              <Icon />
            </a>
          </li>
        )
      })}
    </>
  )
}

export default Socials
