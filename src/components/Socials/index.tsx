import type { FC } from "react"
import * as config from "@/lib/config"
import Facebook from "./Facebook"
import Instagram from "./Instagram"
import YouTube from "./YouTube"

type Props = {
  hoverClr: string
  sizes: string
}

const index: FC<Props> = ({ hoverClr, sizes }) => {
  return (
    <>
      {config.socials.map(({ platform, link }, i) => (
        <li key={i}>
          <a
            href={link}
            target="_blank"
            aria-label={`Link to Yogesh Samsi's ${platform}`}
            className={`block aspect-square transition-colors ${sizes} hover:${hoverClr}`}
            data-umami-event={platform.toLocaleLowerCase()}
          >
            {(() => {
              switch (platform) {
                case "YouTube":
                  return <YouTube />
                  break
                case "Instagram":
                  return <Instagram />
                  break
                case "Facebook":
                  return <Facebook />
                  break
                default:
                  return
              }
            })()}
          </a>
        </li>
      ))}
    </>
  )
}

export default index
