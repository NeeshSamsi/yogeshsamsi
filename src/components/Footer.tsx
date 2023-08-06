import Link from "next/link"

import reader from "@/lib/keystatic"

import Socials from "./Socials"
import MailingList from "./MailingList"

const Footer = async () => {
  const settings = await reader.singletons.settings.read()

  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const { email, navLinks, mailingListTitle, mailingListDescription } = settings

  return (
    <footer className="flex flex-col items-center justify-between gap-16 bg-light px-8 py-8 md:flex-row md:items-start md:gap-8 md:px-col-outer">
      <MailingList
        title={mailingListTitle}
        description={mailingListDescription}
      />
      <div className="flex flex-col items-center gap-4 md:items-start xl:gap-8">
        <p className="font-serif text-2xl font-bold tracking-wider xl:text-3xl 3xl:text-4xl">
          Find me here:
        </p>
        <ul className="flex gap-4 md:gap-6">
          <Socials hoverClr="text-darker/80" sizes="h-8 xl:h-10" />
        </ul>
        <a
          href={`mailto:${email}`}
          className="text-base hover:underline xl:text-lg 2xl:text-xl"
        >
          {email}
        </a>
      </div>
      <div>
        <ul className="flex flex-col items-center gap-4 text-base uppercase md:items-start lg:text-lg 2xl:gap-6 2xl:text-xl 3xl:text-2xl">
          {navLinks.map(({ path, text, newWindow }, i) => (
            <li key={i} className="transition-colors hover:text-darker/80">
              <Link href={path} target={newWindow ? "_blank" : "_self"}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
