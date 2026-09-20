// Classic honeypot bait: a plausible field name a bot's blind form-filler is
// likely to populate. Off-screen, out of the tab order, and aria-hidden so a
// sighted or screen-reader user never encounters it. Deliberately outside
// react-hook-form (see botCheckSchema in src/lib/zodSchemas.ts) - read
// straight off the native submit event's form element instead of a ref, so
// React's purity rules don't flag a ref being read from a submit closure.
// See src/lib/botCheck.ts.
export default function HoneypotField() {
  return (
    <input
      name="company"
      type="text"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-px w-px overflow-hidden"
    />
  )
}
