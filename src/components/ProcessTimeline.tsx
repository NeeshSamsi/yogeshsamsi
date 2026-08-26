interface ProcessStep {
  title: string
}

export default function ProcessTimeline({
  steps,
}: {
  steps: readonly ProcessStep[]
}) {
  return (
    <ol className="flex flex-col gap-8">
      {steps.map((step, i) => (
        <li
          key={i}
          className="text-lighter bg-[#563310] px-4 py-4 md:px-6 md:py-6"
        >
          <div className="flex items-start gap-4 md:gap-6">
            <span className="text-light font-serif text-lg font-semibold tracking-wide lg:text-xl xl:text-2xl 2xl:text-3xl">
              {i + 1}.
            </span>
            <h3 className="font-serif text-lg font-semibold tracking-wide lg:text-xl xl:text-2xl 2xl:text-3xl">
              {step.title}
            </h3>
          </div>
        </li>
      ))}
    </ol>
  )
}
