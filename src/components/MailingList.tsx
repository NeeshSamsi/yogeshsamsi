"use client"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { mailingListSchema, MailingListSchemaType } from "@/lib/zodSchemas"
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/solid"
import { subscribe } from "@/app/actions/mailing-list"
import { useFormSubmission } from "@/hooks/useFormSubmission"
import { track } from "@/lib/analytics"
import { readHoneypot } from "@/lib/botCheck"
import FloatingLabelInput from "@/components/ui/FloatingLabelInput"
import HoneypotField from "@/components/ui/HoneypotField"
import Spinner from "@/components/ui/Spinner"

const MailingList = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const { state, start, succeed, fail } = useFormSubmission()
  // This form is always mounted (footer, every page), so "time since
  // component mount" is a reasonable stand-in for "time a human had to fill
  // it" - unlike the dialog-based forms, there is no open/close to key off.
  // The lazy initializer runs once, on mount, rather than on every render.
  const [startedAt] = useState(() => Date.now())

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MailingListSchemaType>({
    resolver: zodResolver(mailingListSchema),
  })

  const onSubmit: SubmitHandler<MailingListSchemaType> = async (
    data,
    event,
  ) => {
    start()
    const res = await subscribe({
      ...data,
      company: readHoneypot(event),
      startedAt,
    })

    if (!res?.data?.ok) {
      track("mailing-list-signup-failed", {})
      fail("Something went wrong. Please try again later.")
    } else {
      // `result` is only set on a genuine signup, never on the bot
      // fake-success (src/lib/botCheck.ts).
      if (res.data.result)
        track("mailing-list-signup", { result: res.data.result })
      succeed(res.data.message || "Thank you for joining the Mailing List!")
      reset()
    }
  }

  const outcome =
    state.status === "done" || state.status === "error" ? state.message : null

  return (
    <form
      className="border-darker bg-lighter 3xl:gap-8 3xl:text-xl flex max-w-[35ch] flex-col gap-6 border px-8 py-6 text-base md:px-6 md:py-4 lg:px-8 lg:py-6 xl:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <HoneypotField />
      <div>
        <h6 className="3xl:mb-6 3xl:text-4xl mb-4 font-serif text-2xl font-bold tracking-wider xl:text-3xl">
          {title}
        </h6>
        <p className="3xl:text-lg text-sm xl:text-base">{description}</p>
      </div>
      <div className="grid gap-2">
        <div className="3xl:gap-6 flex items-end gap-4">
          <UserIcon className="3xl:h-8 aspect-square h-6 xl:h-7" />
          <FloatingLabelInput
            type="text"
            id="mlName"
            placeholder="Full name"
            register={register}
          />
        </div>
        {errors.mlName && (
          <p className="3xl:text-lg text-sm text-red-600 xl:text-base">
            {errors.mlName?.message}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <div className="3xl:gap-6 flex items-end gap-4">
          <EnvelopeIcon className="3xl:h-8 aspect-square h-6 xl:h-7" />
          <FloatingLabelInput
            type="email"
            id="mlEmail"
            placeholder="Email address"
            register={register}
          />
        </div>
        {errors.mlEmail && (
          <p className="3xl:text-lg text-sm text-red-600 xl:text-base">
            {errors.mlEmail?.message}
          </p>
        )}
      </div>
      {outcome !== null ? (
        <p className="text-darker 3xl:text-xl text-base xl:text-lg">
          {outcome}
        </p>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-darker text-lighter hover:bg-darker/90 focus-visible:bg-darker/90 disabled:bg-darker/90 flex items-center justify-center px-5 py-2 font-serif font-semibold tracking-wider transition-all disabled:cursor-not-allowed"
        >
          {!isSubmitting ? <span>Join now</span> : <Spinner />}
        </button>
      )}
    </form>
  )
}

export default MailingList
