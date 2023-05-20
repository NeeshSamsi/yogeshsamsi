import * as config from "@/lib/config"
import Socials from "./Socials"
import Link from "next/link"
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/solid"

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-16 bg-light px-8 py-4 md:flex-row md:items-start md:gap-6 md:px-col-outer">
      <MailingList />
      <div className="flex flex-col items-center gap-4 md:items-start">
        <p className="font-serif text-xl font-semibold tracking-wider">
          {config.content.footer.contactHeading}
        </p>
        <ul className="flex gap-4 md:gap-6">
          <Socials hoverClr="text-darker/80" size="lg" />
        </ul>
        <a href={`mailto:${config.email}`} className="hover:underline">
          {config.email}
        </a>
      </div>
      <div>
        <ul className="flex flex-col items-center gap-3 uppercase md:items-start">
          {config.navLinks.map(({ path, text, newWindow }, i) => (
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
    <form className="flex max-w-[35ch] flex-col gap-6 border border-darker bg-lighter px-8 py-6 md:px-6 md:py-4 lg:px-8 lg:py-6">
      <div>
        <h6 className="mb-2 font-serif text-2xl font-bold tracking-wider">
          {config.content.footer.mailingList.heading}
        </h6>
        <p className="text-sm">
          {config.content.footer.mailingList.subheading}
        </p>
      </div>
      <div className="relative flex items-center gap-4">
        <UserIcon className="h-6 w-6" />
        <div className="relative w-full">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full name"
            className="peer w-full border-0 border-b border-darker bg-lighter px-0 placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-darker focus:ring-0"
          />
          <label
            htmlFor="name"
            className="absolute -top-3 left-0 w-full text-sm text-darker transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-darker/70 peer-focus-within:-top-3 peer-focus-within:text-sm peer-focus-within:text-darker"
          >
            Full name
          </label>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <EnvelopeIcon className="h-6 w-6" />
        <div className="relative w-full">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            className="peer w-full border-0 border-b border-darker bg-lighter px-0 placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-darker focus:ring-0"
          />
          <label
            htmlFor="email"
            className="absolute -top-3 left-0 w-full text-sm text-darker placeholder-transparent transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-darker/80 peer-focus-within:-top-3 peer-focus-within:text-sm peer-focus-within:text-darker"
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
