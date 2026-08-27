import type { FC } from "react"
import { socials, type Social } from "./socials"
import Facebook from "./Facebook"
import Instagram from "./Instagram"
import YouTube from "./YouTube"

type Props = {
  hoverClr: string
  sizes: string
}

const icons: Record<Social["platform"], FC> = { YouTube, Instagram, Facebook }

const Socials: FC<Props> = ({ hoverClr, sizes }) => {
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
