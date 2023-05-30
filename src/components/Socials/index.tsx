import type { FC } from "react"
import * as config from "@/lib/config"
import Link from "next/link"
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
          <Link
            href={link}
            className={`block aspect-square transition-colors ${sizes} hover:${hoverClr}`}
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
          </Link>
        </li>
      ))}
    </>
  )
}

export default index
