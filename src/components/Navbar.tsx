"use client"

import * as config from "@/lib/config"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Socials from "./Socials"

const Navbar = () => {
  const pathname = usePathname()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)

  const handleHamburger = () => {
    setIsHamburgerOpen((prevHamburgerState) => !prevHamburgerState)
  }

  return (
    <div
      className={`${isHamburgerOpen && "h-screen"} sticky inset-0 text-lighter`}
    >
      <nav className="flex w-full items-center justify-between gap-12 bg-darker  px-8 py-4 text-sm md:px-[10vw] lg:text-base">
        <div>
          <ul className="hidden gap-4 md:flex lg:gap-6">
            {config.navLinks.map(({ path, text, newWindow }, i) => (
              <li
                key={i}
                className={`transition-colors hover:text-light ${
                  pathname === path && "text-light"
                }`}
              >
                <Link href={path} target={newWindow ? "_blank" : "_self"}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
          <p className="block font-serif text-2xl font-semibold tracking-wider md:hidden">
            Yogesh Samsi
          </p>
        </div>
        <div>
          <ul className="hidden gap-4 md:flex lg:gap-6">
            <Socials />
          </ul>

          <div
            className={`tham tham-e-spin tham-w-6 flex hover:opacity-100 md:hidden ${
              isHamburgerOpen && "tham tham-active"
            }`}
            onClick={handleHamburger}
          >
            <div className="tham-box">
              <div className="tham-inner bg-lighter hover:bg-light" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`${
          isHamburgerOpen ? "flex animate-nav-show" : "hidden"
        } h-full flex-col items-center gap-12  bg-darker pt-16 text-lg md:hidden`}
      >
        <ul className="flex flex-col items-center gap-4">
          {config.navLinks.map(({ path, text, newWindow }, i) => (
            <li
              key={i}
              className={`transition-colors hover:text-light ${
                pathname === path && "text-light"
              }`}
            >
              <Link href={path} target={newWindow ? "_blank" : "_self"}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-6">
          <Socials />
        </ul>
      </div>
    </div>
  )
}

export default Navbar
