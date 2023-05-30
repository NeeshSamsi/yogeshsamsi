import type { FC, ReactElement } from "react"
import Link from "next/link"

type IconType = { element: ReactElement; sizes: string }

type Props = {
  as: "button" | "link"
  text: string
  type: "Primary" | "Secondary"
  theme: "Light" | "Dark"
  href?: string
  icon?: IconType
  download?: boolean
}

const Button: FC<Props> = ({ as, text, type, theme, icon, href, download }) => {
  const commonStyles = `py-2 px-3 md:px-4 transition-colors flex items-center gap-2 md:gap-3 3xl:py-3 3xl:px-5`
  const themeStyles = `${
    type === "Primary" &&
    `${theme === "Light" && "bg-light text-darker hover:bg-lighter"} ${
      theme === "Dark" && "bg-dark text-lighter hover:bg-dark/90"
    }`
  }
      ${
        type === "Secondary" &&
        `${theme === "Light" && "text-light hover:text-lighter"} ${
          theme === "Dark" && "text-dark hover:text-dark/90"
        }`
      }`

  const Icon: FC<{ icon: IconType }> = ({ icon }) => {
    const { element, sizes } = icon
    return <span className={`aspect-square ${sizes}`}>{element}</span>
  }

  switch (as) {
    case "button":
      return (
        <button className={`${commonStyles} ${themeStyles}`}>
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
          className={`${commonStyles} ${themeStyles}`}
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
