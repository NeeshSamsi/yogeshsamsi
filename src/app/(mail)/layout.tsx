import "../(main)/globals.css"

import reader from "@/lib/keystatic"

import Navbar from "@/components/Navbar"

export default async function MailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const { navLinks } = settings

  return (
    <div className="min-h-screen">
      <Navbar navLinks={navLinks} />
      {children}
    </div>
  )
}
