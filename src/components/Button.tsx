import type { FC, ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

type Props = {
  as: "button" | "link"
  children: ReactNode
  type: "Primary" | "Secondary"
  theme: "Lighter" | "Light" | "Darker" | "Dark"
  href?: string
  download?: boolean
}

const Button: FC<Props> = ({ as, children, type, theme, href, download }) => {
  const buttonClasses = cn(
    "py-2 px-3 md:px-4 transition-colors flex items-center gap-2 md:gap-3 3xl:py-3 3xl:px-5",
    {
      "bg-light text-darker hover:bg-lighter":
        type === "Primary" && theme === "Light",
      "bg-lighter text-darker hover:bg-light":
        type === "Primary" && theme === "Lighter",
      "bg-dark text-lighter hover:bg-dark/90":
        type === "Primary" && theme === "Dark",
      "bg-darker text-lighter hover:bg-darker/90":
        type === "Primary" && theme === "Darker",
      "text-light hover:text-lighter":
        type === "Secondary" && theme === "Light",
      "text-lighter hover:text-light":
        type === "Secondary" && theme === "Lighter",
      "text-dark hover:text-dark/80": type === "Secondary" && theme === "Dark",
      "text-darker hover:text-darker/80":
        type === "Secondary" && theme === "Darker",
    },
  )

  switch (as) {
    case "button":
      return <button className={buttonClasses}>{children}</button>
      break
    case "link":
      return (
        <Link
          href={href ? href : "/"}
          download={download}
          className={buttonClasses}
        >
          {children}
        </Link>
      )
      break

    default:
      throw new Error("Invalid Button Configuration")
      break
  }
}

export default Button
