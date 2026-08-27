"use client"

import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { contactFormSchema, ContactFormSchemaType } from "@/lib/zodSchemas"
import { contact } from "@/app/actions/contact"
import { useFormSubmission } from "@/hooks/useFormSubmission"
import FloatingLabelInput from "@/components/ui/FloatingLabelInput"
import Spinner from "@/components/ui/Spinner"

import {
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/solid"

const ContactForm = () => {
  const { state, start, succeed, fail } = useFormSubmission()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit: SubmitHandler<ContactFormSchemaType> = async (data) => {
    start()
    const res = await contact(data)

    if (!res?.data?.ok) {
      fail("Something went wrong. Please try again later.")
    } else {
      succeed("Thank you reaching out. We will get back to you soon.")
      reset()
    }
  }

  const outcome =
    state.status === "done" || state.status === "error" ? state.message : null

  return (
    <form
      className="grid w-fit gap-8 xl:gap-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="3xl:text-7xl font-serif text-4xl leading-relaxed font-bold tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl">
        Contact Us
      </h1>

      <div className="grid gap-2">
        <div className="flex items-end gap-4 xl:gap-6">
          <UserIcon className="3xl:h-10 aspect-square h-8 xl:h-9" />
          <FloatingLabelInput
            type="text"
            id="name"
            placeholder="Full name"
            register={register}
            variant="contact"
          />
        </div>
        {errors.name && (
          <p className="3xl:text-xl text-base text-red-600 xl:text-lg">
            {errors.name?.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex items-end gap-4 xl:gap-6">
          <EnvelopeIcon className="3xl:h-10 aspect-square h-8 xl:h-9" />
          <FloatingLabelInput
            type="email"
            id="email"
            placeholder="Email address"
            register={register}
            variant="contact"
          />
        </div>
        {errors.email && (
          <p className="3xl:text-xl text-base text-red-600 xl:text-lg">
            {errors.email?.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex items-end gap-4 xl:gap-6">
          <ChatBubbleBottomCenterTextIcon className="3xl:h-10 aspect-square h-8 xl:h-9" />
          <FloatingLabelInput
            type="textarea"
            id="message"
            placeholder="Your message"
            register={register}
            variant="contact"
          />
        </div>
        {errors.message && (
          <p className="3xl:text-xl text-base text-red-600 xl:text-lg">
            {errors.message?.message}
          </p>
        )}
      </div>

      {outcome !== null ? (
        <p className="text-dark 3xl:text-2xl text-lg font-medium xl:text-xl">
          {outcome}
        </p>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-dark text-lighter hover:bg-dark/90 disabled:bg-dark/90 3xl:text-2xl flex w-fit items-center gap-4 px-5 py-3 font-serif text-lg font-semibold tracking-wider transition-colors disabled:cursor-not-allowed xl:text-xl"
        >
          {!isSubmitting ? (
            <>
              <span>Reach out</span>
              <PaperAirplaneIcon className="aspect-square h-4 xl:h-5" />
            </>
          ) : (
            <Spinner />
          )}
        </button>
      )}
    </form>
  )
}

export default ContactForm
