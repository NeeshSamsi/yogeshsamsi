"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
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

  const closeHamburger = () => {
    setIsHamburgerOpen(false)
  }

  return (
    <nav
      className={`${
        isHamburgerOpen && "h-screen"
      } text-lighter shadow-darker/40 sticky inset-0 z-50 shadow-xl`}
    >
      <div className="bg-darker md:px-col-outer flex w-full items-center justify-between gap-12 px-8 py-4 md:py-6">
        <div>
          <ul className="hidden gap-4 md:flex md:text-base lg:gap-6 lg:text-lg 2xl:text-xl">
            {navLinks.map(({ path, text, newWindow }, i) => (
              <li
                key={i}
                className={cn(
                  "hover:text-light transition-colors",
                  pathname === path && "text-light",
                )}
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
              hoverClr="hover:text-light"
              sizes="h-8 sm:h-12 md:h-6 lg:h-8 3xl:h-10"
            />
          </ul>

          <div
            className={cn(
              "tham flex hover:opacity-100 md:hidden",
              isHamburgerOpen && "tham-active",
            )}
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
          isHamburgerOpen ? "animate-nav-show flex" : "hidden"
        } bg-darker h-full flex-col items-center gap-12 pt-16 text-xl sm:text-2xl md:hidden`}
      >
        <ul className="flex flex-col items-center gap-6">
          {navLinks.map(({ path, text, newWindow }, i) => (
            <li
              key={i}
              className={cn(
                "hover:text-light transition-colors",
                pathname === path && "text-light",
              )}
            >
              <Link
                href={path}
                target={newWindow ? "_blank" : "_self"}
                onClick={closeHamburger}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-6">
          <Socials
            hoverClr="hover:text-light"
            sizes="h-8 sm:h-12 md:h-6 lg:h-8 3xl:h-10"
          />
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
