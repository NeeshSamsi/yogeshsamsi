import * as config from "@/lib/config"
import Link from "next/link"
import Facebook from "./Facebook"
import Instagram from "./Instagram"
import YouTube from "./YouTube"

const index = () => {
  return (
    <>
      {config.socials.map(({ platform, link }, i) => (
        <Link href={link} key={i} className="h-7 w-7">
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
