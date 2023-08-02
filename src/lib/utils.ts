type DateStyle = Intl.DateTimeFormatOptions["dateStyle"]

export function formatDates(date: Date[], dateStyle: DateStyle = "medium") {
  const formatter = new Intl.DateTimeFormat("en", { dateStyle })

  if (date.length === 1) {
    return formatter.format(date[0])
  }

  if (date.length > 1) {
    // for (let i = 0; i < date.length; i++) {
    //   const prevElement = date[i--]
    //   const element = date[i]
    //   let dateString = ""
    //   if (i === 0) {
    //     dateString = String(element.getDate())
    //   }
    //   if (prevElement.getMonth() === element.getMonth()) {
    //     dateString = `${dateString}, ${String(element.getDate())}`
    //   } else if (prevElement.getMonth() !== element.getMonth()) {
    //     dateString = `${prevElement.getMonth()} `
    //   }
    // }
  }
}
