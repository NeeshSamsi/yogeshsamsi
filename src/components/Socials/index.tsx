import type { FC } from "react"
import * as config from "@/lib/config"
import Link from "next/link"
import Facebook from "./Facebook"
import Instagram from "./Instagram"
import YouTube from "./YouTube"

type Props = {
  hoverClr: string
  size: "sm" | "lg"
}

const index: FC<Props> = ({ hoverClr, size }) => {
  return (
    <>
      {config.socials.map(({ platform, link }, i) => (
        <li
          key={i}
        >
          <Link href={link} className={`block h-8 aspect-square transition-colors ${(() => {
            switch (size) {
              case "sm":
                return "h-8 sm:h-12 md:h-6 lg:h-8"
                break
              case "lg":
                return "md:h-7 lg:h-8"
                break
              default:
                return
            }
          })()} hover:${hoverClr}`}>
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
