// Splits a full name into Bento's `first_name` / `last_name` fields. Extracted
// (F3) from the four form actions, which each inlined the same two `split(" ")`
// expressions.
export function splitName(name: string): {
  first_name: string
  last_name: string
} {
  return {
    first_name: name.split(" ")[0],
    last_name: name.split(" ").slice(1).join(" "),
  }
}
