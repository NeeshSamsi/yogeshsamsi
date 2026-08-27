import "../(main)/globals.css"

import { readSingleton } from "@/lib/content"

import Navbar from "@/components/Navbar"

export default async function MailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { navLinks } = await readSingleton("settings")

  return (
    <div className="min-h-screen">
      <Navbar navLinks={navLinks} />
      {children}
    </div>
  )
}
