import type { FC, ReactElement } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

type IconType = { element: ReactElement; sizes: string }

type Props = {
  as: "button" | "link"
  text: string
  type: "Primary" | "Secondary"
  theme: "Lighter" | "Light" | "Darker"
  href?: string
  icon?: IconType
  download?: boolean
}

const Button: FC<Props> = ({ as, text, type, theme, icon, href, download }) => {
  const buttonClasses = cn(
    "py-2 px-3 md:px-4 transition-colors flex items-center gap-2 md:gap-3 3xl:py-3 3xl:px-5",
    {
      "bg-light text-darker hover:bg-lighter":
        type === "Primary" && theme === "Light",
      "bg-lighter text-darker hover:bg-light":
        type === "Primary" && theme === "Lighter",
      "bg-darker text-lighter hover:bg-darker/90":
        type === "Primary" && theme === "Darker",
      "text-light hover:text-lighter":
        type === "Secondary" && theme === "Light",
      "text-lighter hover:text-light":
        type === "Secondary" && theme === "Lighter",
      "text-darker hover:text-darker/80":
        type === "Secondary" && theme === "Darker",
    },
  )

  const Icon: FC<{ icon: IconType }> = ({ icon }) => {
    const { element, sizes } = icon
    return <span className={`aspect-square ${sizes}`}>{element}</span>
  }

  switch (as) {
    case "button":
      return (
        <button className={buttonClasses}>
          <span>{text}</span>
          {icon && <Icon icon={icon} />}
        </button>
      )
      break
    case "link":
      return (
        <Link
          href={href ? href : "/"}
          download={download}
          className={buttonClasses}
        >
          <span>{text}</span>
          {icon && <Icon icon={icon} />}
        </Link>
      )
      break

    default:
      return <p>Error - Invalid Button Component Config</p>
      break
  }
}

export default Button
