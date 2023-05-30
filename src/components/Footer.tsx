import * as config from "@/lib/config"
import Socials from "./Socials"
import Link from "next/link"
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/solid"

const { email, navLinks, content } = config
const { contactHeading, mailingList } = content.footer

const headingFontStyles =
  "font-serif text-2xl font-bold tracking-wider xl:text-3xl 3xl:text-4xl"

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-16 bg-light px-8 py-8 md:flex-row md:items-start md:gap-8 md:px-col-outer">
      <MailingList />
      <div className="flex flex-col items-center gap-4 md:items-start xl:gap-8">
        <p className={`${headingFontStyles}`}>{contactHeading}</p>
        <ul className="flex gap-4 md:gap-6">
          <Socials hoverClr="text-darker/80" sizes="h-8 xl:h-10" />
        </ul>
        <a
          href={`mailto:${config.email}`}
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

const MailingList = () => {
  return (
    <form className="flex max-w-[35ch] flex-col gap-6 border border-darker bg-lighter px-8 py-6 text-base md:px-6 md:py-4 lg:px-8 lg:py-6 xl:text-lg 3xl:gap-8 3xl:text-xl">
      <div>
        <h6 className={`mb-4 3xl:mb-6 ${headingFontStyles}`}>
          {mailingList.heading}
        </h6>
        <p className="text-sm xl:text-base 3xl:text-lg">
          {mailingList.subheading}
        </p>
      </div>
      <div className="flex items-end gap-4 3xl:gap-6">
        <UserIcon className="aspect-square h-6 xl:h-7 3xl:h-8" />
        <div className="relative w-full cursor-text">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full name"
            className="peer w-full border-0 border-b border-darker bg-lighter px-0 placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-darker focus:ring-0"
          />
          <label
            htmlFor="name"
            className="absolute -top-3 left-0 w-full cursor-text text-sm text-darker transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-darker/70 peer-focus-within:-top-3 peer-focus-within:text-sm peer-focus-within:text-darker xl:text-base xl:peer-placeholder-shown:text-lg xl:peer-focus-within:text-base 3xl:text-lg 3xl:peer-placeholder-shown:text-xl 3xl:peer-focus-within:text-lg"
          >
            Full name
          </label>
        </div>
      </div>
      <div className="flex items-end gap-4 3xl:gap-6">
        <EnvelopeIcon className="aspect-square h-6 xl:h-7 3xl:h-8" />
        <div className="relative w-full cursor-text">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            className="peer w-full border-0 border-b border-darker bg-lighter px-0 placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-darker focus:ring-0"
          />
          <label
            htmlFor="email"
            className="absolute -top-3 left-0 w-full cursor-text text-sm text-darker placeholder-transparent transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-darker/80 peer-focus-within:-top-3 peer-focus-within:text-sm peer-focus-within:text-darker xl:text-base xl:peer-placeholder-shown:text-lg xl:peer-focus-within:text-base"
          >
            Email address
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-darker px-5 py-2 font-serif font-semibold tracking-wider text-lighter"
      >
        Join now
      </button>
    </form>
  )
}

export default Footer
