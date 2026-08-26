import "../(main)/globals.css"

export default function MailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-lighter text-darker min-h-screen font-sans">
      {children}
    </div>
  )
}
