import type { FC, ReactElement } from "react"
import Link from "next/link"

type Theme = "Light"

type Props = {
  as: "button" | "link"
  text: string
  type: "Primary" | "Secondary"
  theme: Theme
  href?: string
  icon?: { element: ReactElement; sizes: string }
}

const Button: FC<Props> = ({ as, text, type, theme, icon, href }) => {
  const commonStyles = `py-2 px-3 md:px-4 font-medium transition-all flex items-center gap-2 md:gap-3`

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
        {icon && (
          <span className={`aspect-square ${icon.sizes}`}>{icon.element}</span>
        )}
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
        <span className="self-stretch">{text}</span>
        {icon && (
          <span className={`aspect-square ${icon.sizes}`}>{icon.element}</span>
        )}
      </Link>
    )
  } else {
    return <p>Error - Button</p>
  }
}

export default Button
