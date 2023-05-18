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
        <Link
          href={link}
          key={i}
          className={`h-8 w-8 transition-colors ${(() => {
            switch (size) {
              case "sm":
                return "md:h-6 md:w-6 lg:h-7 lg:w-7"
                break
              case "lg":
                return "md:h-7 md:w-7 lg:h-8 lg:w-8"
                break
              default:
                return
            }
          })()} hover:${hoverClr}`}
        >
          <li>
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
          </li>
        </Link>
      ))}
    </>
  )
}

export default index
