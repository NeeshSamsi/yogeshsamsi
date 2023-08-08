import type { FC, PropsWithChildren } from "react"

type Props = {
  id?: string
  bgClr: BackgroundColors
  txtClr: TextColors
}

const Section: FC<PropsWithChildren<Props>> = ({
  id,
  bgClr,
  txtClr,
  children,
}) => {
  return (
    <section
      id={id}
      className={`px-8 py-12 md:px-col-inner md:py-20 2xl:py-32 ${bgClr} ${txtClr}`}
    >
      <div className="mx-auto max-w-screen-2xl space-y-12 md:space-y-20 2xl:space-y-32">
        {children}
      </div>
    </section>
  )
}

export default Section
