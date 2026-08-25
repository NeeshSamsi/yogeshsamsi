// The Keystatic date field gives us a YYYY-MM-DD string - parse it as local
// time so the displayed date never shifts by a day across timezones.
export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
