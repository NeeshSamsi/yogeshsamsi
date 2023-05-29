"use client"

import * as config from "@/lib/config"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Socials from "./Socials"

const Navbar = () => {
  const pathname = usePathname()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)

  const handleHamburger = () => {
    setIsHamburgerOpen((prevHamburgerState) => !prevHamburgerState)
  }

  useEffect(() => setIsHamburgerOpen(false), [pathname])

  return (
    <nav
      className={`${
        isHamburgerOpen && "h-screen"
      } sticky inset-0 z-50 text-lighter shadow-xl shadow-darker/40`}
    >
      <div className="flex w-full items-center justify-between gap-12 bg-darker px-8 py-4 md:px-col-outer">
        <div>
          <ul className="hidden gap-4 md:flex lg:gap-6 md:text-base lg:text-lg 2xl:text-xl">
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
            <Socials hoverClr="text-light" size="sm" />
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
      </div>

      {/* Mobile Nav */}
      <div
        className={`${
          isHamburgerOpen ? "flex animate-nav-show" : "hidden"
        } h-full flex-col items-center gap-12  bg-darker  text-xl sm:text-2xl md:hidden pt-16`}
      >
        <ul className="flex flex-col items-center gap-6">
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
          <Socials hoverClr="text-light" size="sm" />
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
