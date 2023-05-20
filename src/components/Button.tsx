import type { FC, ReactElement } from "react"
import Link from "next/link"

type Theme = "Light"

type Props = {
  as: "button" | "link"
  text: string
  type: "Primary" | "Secondary"
  theme: Theme
  href?: string
  icon?: ReactElement
}

const Button: FC<Props> = ({ as, text, type, theme, icon, href }) => {
  const commonStyles = `py-2 px-3 md:px-4 font-medium text-sm sm:text-lg md:text-base lg:text-lg xl:text-xl transition-all flex items-center gap-3`

  const lightStyles = "text-light transition-colors hover:text-lighter"

  if (as === "button") {
    return (
      <button
        className={
          type === "Primary"
            ? `${commonStyles} ${
                theme === "Light" &&
                `bg-light text-dark hover:bg-lighter hover:text-darker`
              }`
            : `${commonStyles} ${theme === "Light" && lightStyles}`
        }
      >
        <span>{text}</span>
        <span className="aspect-square w-4 sm:w-5 xl:w-6">{icon}</span>
      </button>
    )
  } else if (as === "link") {
    return (
      <Link
        href={href ? href : "/"}
        className={
          type === "Primary"
            ? `${commonStyles} ${
                theme === "Light" &&
                `bg-light text-dark hover:bg-lighter hover:text-darker`
              }`
            : `${commonStyles} ${theme === "Light" && lightStyles}`
        }
      >
        <span>{text}</span>
        <span className="aspect-square w-4 sm:w-5 xl:w-6">{icon}</span>
      </Link>
    )
  } else {
    return <p>Error - Button</p>
  }
}

export default Button
