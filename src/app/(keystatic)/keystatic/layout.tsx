import KeystaticApp from "./keystatic"

export const metadata = {
  title: "Yogesh Samsi Admin - Keystatic",
}

// No <html>/<body> here - src/app/layout.tsx owns them. This route never
// imports globals.css, so the root body's Tailwind classes are inert and the
// admin UI keeps its own styling.
export default function KeystaticLayout() {
  return <KeystaticApp />
}
