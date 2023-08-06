"use client"

import { type ReactElement, useState } from "react"

import { useForm, UseFormRegister, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { contactFormSchema, ContactFormSchemaType } from "@/lib/zodSchemas"

import {
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/solid"

const ContactForm = () => {
  const [response, setResponse] = useState<string>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit: SubmitHandler<ContactFormSchemaType> = async (data) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (res.status !== 200) {
      setResponse("Something went wrong. Please try again later.")
    } else {
      setResponse("Thank you reaching out. We will get back to you soon.")
      reset()
    }

    setTimeout(() => {
      setResponse(undefined)
    }, 5000)
  }

  const showConfirmation = !isSubmitted ? false : response ? true : false

  return (
    <form
      className="grid w-fit gap-8 xl:gap-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-serif text-4xl font-bold leading-relaxed tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
        Contact Us
      </h1>

      <div className="grid gap-2">
        <div className="flex items-end gap-4 xl:gap-6">
          <UserIcon className="aspect-square h-8 xl:h-9 3xl:h-10" />
          <FloatingLabelInput
            type="text"
            id="name"
            placeholder="Full name"
            register={register}
          />
        </div>
        {errors.name && (
          <p className="text-base text-red-600 xl:text-lg 3xl:text-xl">
            {errors.name?.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
      <div className="flex items-end gap-4 xl:gap-6">
        <EnvelopeIcon className="aspect-square h-8 xl:h-9 3xl:h-10" />
        <FloatingLabelInput
          type="email"
          id="email"
          placeholder="Email address"
          register={register}
        />
      </div>
      {errors.email && (
        <p className="text-base text-red-600 xl:text-lg 3xl:text-xl">
          {errors.email?.message}
        </p>
      )}
      </div>
      
<div className="grid gap-2">
      <div className="flex items-end gap-4 xl:gap-6">
        <ChatBubbleBottomCenterTextIcon className="aspect-square h-8 xl:h-9 3xl:h-10" />
        <FloatingLabelInput
          type="textarea"
          id="message"
          placeholder="Your message"
          register={register}
        />
      </div>
      {errors.message && (
        <p className="text-base text-red-600 xl:text-lg 3xl:text-xl">
          {errors.message?.message}
        </p>
      )}
      </div>
      
      {showConfirmation ? (
        <p className="text-lg font-medium text-dark xl:text-xl 3xl:text-2xl">{response}</p>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-fit items-center gap-4 bg-dark px-5 py-3 font-serif text-lg font-semibold tracking-wider text-lighter transition-colors hover:bg-dark/90 disabled:cursor-not-allowed disabled:bg-dark/90 xl:text-xl 3xl:text-2xl"
        >
          {!isSubmitting ? (
            <>
              <span>Reach out</span>
              <PaperAirplaneIcon className="aspect-square h-4 xl:h-5" />
            </>
          ) : (
            <div role="status">
              <svg
                aria-hidden="true"
                className="h-8 w-8 animate-spin fill-light text-lighter"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
      )}
    </form>
  )
}

const FloatingLabelInput = ({
  type,
  id,
  placeholder,
  register,
}: {
  type: "text" | "email" | "textarea"
  id: "name" | "email" | "message"
  placeholder: string
  register: UseFormRegister<ContactFormSchemaType>
}) => {
  if (type === "textarea") {
    return (
      <div className="relative w-full cursor-text">
        <textarea
          rows={1}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className="peer w-full border-0 border-b border-dark bg-lighter px-0 text-lg placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-dark focus:ring-0 xl:text-xl 3xl:text-2xl"
        />
        <label
          htmlFor={id}
          className="3xl:peer-placeholder-shown:text-2xl3xl:peer-focus-within:text-xl absolute -top-3 left-0 w-full cursor-text text-base text-dark transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-dark/70 peer-focus-within:-top-3 peer-focus-within:text-base peer-focus-within:text-dark xl:-top-5 xl:text-lg xl:peer-placeholder-shown:text-xl xl:peer-focus-within:-top-5 xl:peer-focus-within:text-lg 3xl:text-xl"
        >
          {placeholder}
        </label>
      </div>
    )
  } else {
    return (
      <div className="relative w-full cursor-text">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className="peer w-full border-0 border-b border-dark bg-lighter px-0 text-lg placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-dark focus:ring-0 xl:text-xl 3xl:text-2xl"
        />
        <label
          htmlFor={id}
          className="3xl:peer-placeholder-shown:text-2xl3xl:peer-focus-within:text-xl absolute -top-3 left-0 w-full cursor-text text-base text-dark transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-dark/70 peer-focus-within:-top-3 peer-focus-within:text-base peer-focus-within:text-dark xl:-top-5 xl:text-lg xl:peer-placeholder-shown:text-xl xl:peer-focus-within:-top-5 xl:peer-focus-within:text-lg 3xl:text-xl"
        >
          {placeholder}
        </label>
      </div>
    )
  }
}

export default ContactForm
