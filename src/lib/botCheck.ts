import type { BaseSyntheticEvent } from "react"

// Reads src/components/ui/HoneypotField.tsx's value off the native submit
// event's form element (react-hook-form passes this as onSubmit's second
// argument). Deliberately not a useRef: reading a ref from a closure handed
// to handleSubmit() trips React's purity rules, since the closure is created
// during render even though it only runs on a later submit event.
export function readHoneypot(event: BaseSyntheticEvent | undefined) {
  const form = event?.target as HTMLFormElement | undefined
  return (form?.elements.namedItem("company") as HTMLInputElement | null)?.value
}

const MIN_ELAPSED_MS = 1500

// Two independent signals, checked server-side by every form action that
// takes botCheckSchema's fields: a filled honeypot (a real user never sees
// or fills src/components/ui/HoneypotField.tsx) and a submit that lands
// faster than a human could plausibly read and fill the form. Either one is
// enough. Callers return a fake success - identical to the real one - for a
// hit, so a scripted submitter has nothing to learn from and adapt to, and
// simply omit the ActionResult `result` field the genuine success carries,
// so the client never fires an analytics event for it.
export function isBotSubmission(
  company: string | undefined,
  startedAt: number,
): boolean {
  // playwright.config.ts sets this alongside BENTO_DISABLED (src/lib/bento.ts)
  // so the e2e suite's scripted, near-instant form fills aren't themselves
  // mistaken for the bot traffic this exists to catch.
  if (process.env.BOT_CHECK_DISABLED) return false

  if (company) return true
  return Date.now() - startedAt < MIN_ELAPSED_MS
}
