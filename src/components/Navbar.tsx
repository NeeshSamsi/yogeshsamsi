"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Socials from "./Socials"

const Navbar = ({
  navLinks,
}: {
  navLinks: readonly {
    readonly text: string
    readonly path: string
    readonly newWindow: boolean
  }[]
}) => {
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
      <div className="flex w-full items-center justify-between gap-12 bg-darker px-8 py-4 md:px-col-outer md:py-6">
        <div>
          <ul className="hidden gap-4 md:flex md:text-base lg:gap-6 lg:text-lg 2xl:text-xl">
            {navLinks.map(({ path, text, newWindow }, i) => (
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
            <Socials
              hoverClr="text-light"
              sizes="h-8 sm:h-12 md:h-6 lg:h-8 3xl:h-10"
            />
          </ul>

          <div
            className={`tham-e-spin tham tham-w-6 flex hover:opacity-100 md:hidden ${
              isHamburgerOpen && "tham-active tham"
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
        } h-full flex-col items-center gap-12  bg-darker  pt-16 text-xl sm:text-2xl md:hidden`}
      >
        <ul className="flex flex-col items-center gap-6">
          {navLinks.map(({ path, text, newWindow }, i) => (
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
          <Socials
            hoverClr="text-light"
            sizes="h-8 sm:h-12 md:h-6 lg:h-8 3xl:h-10"
          />
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
