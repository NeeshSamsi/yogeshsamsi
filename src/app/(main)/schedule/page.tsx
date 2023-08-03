import reader from "@/lib/keystatic"

import Event from "@/components/Event"
import Section from "@/components/Section"

const Schedule = async () => {
  const events = (await reader.collections.events.all()).map((event) => ({
    ...event.entry,
    date: event.entry.date.map((dateString) => new Date(dateString)),
    title: event.slug,
  }))
  if (!events) throw new Error("Keystatic Content Not Found - Upcoming Events")

  return (
    <Section role="Upcoming Events" bgClr="bg-lighter" txtClr="text-darker">
      <h1 className="font-serif text-4xl font-bold leading-relaxed tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
        Upcoming Events
      </h1>

      <div className="grid max-w-lg gap-x-12 gap-y-8 lg:max-w-none lg:grid-cols-2 xl:gap-x-16 xl:gap-y-12 3xl:gap-x-20 3xl:gap-y-16">
        {events ? (
          events.map((event, i) => (
            <Event key={i} event={event} theme="Darker" />
          ))
        ) : (
          <p className="text-base sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            No upcoming events
          </p>
        )}
      </div>
    </Section>
  )
}

export default Schedule
