import type { FC } from "react"
import { createElement } from "react"

type Props = {
  as: "h2"
  text: string
}

const SectionHeading: FC<Props> = ({ as, text }) => {
  return createElement(
    as,
    {
      className:
        "text-center font-serif text-3xl font-semibold tracking-wide sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl",
    },
    text
  )
}

export default SectionHeading
