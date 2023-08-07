import { cn, formatDates } from "@/lib/utils"

import { ArrowRightIcon } from "@heroicons/react/24/outline"
import Button from "./Button"

type Props = {
  event: {
    date: Date[]
    title: string
    description: string
    name: string
    link: string | null
    ctaText: string
    ctaLink: string
  }
  theme: "Lighter" | "Darker"
}

const Event = ({
  event: { title, description, name, link, date, ctaLink, ctaText },
  theme,
}: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-4 border border-lighter p-4 text-base xl:gap-6 xl:p-6 xl:text-lg 2xl:text-xl",
        {
          "border-lighter": theme === "Lighter",
          "border-darker": theme === "Darker",
        },
      )}
    >
      <div className="flex flex-col gap-4 xl:gap-6">
        <p className="w-fit font-medium uppercase tracking-wider">
          {date.length === 1 ? formatDates(date) : ""}
        </p>
        <h3 className="font-serif text-xl font-semibold tracking-wide sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          {title}
        </h3>
        <p>{description}</p>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 font-semibold sm:flex-row sm:items-center">
        {link ? (
          <a href={link} className="hover:underline">
            {name}
          </a>
        ) : (
          <p>{name}</p>
        )}
        <Button as="link" href={ctaLink} type="Primary" theme={theme}>
          <>
            <span>{ctaText}</span>
            <span>
              <ArrowRightIcon className="w-3 stroke-[2.5px] xl:w-4" />
            </span>
          </>
        </Button>
      </div>
    </div>
  )
}

export default Event
