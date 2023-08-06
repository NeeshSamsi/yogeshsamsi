"use client"

import { useState } from "react"

import { useForm, UseFormRegister, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { mailingListSchema, MailingListSchemaType } from "@/lib/zodSchemas"
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/solid"

const MailingList = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const [response, setResponse] = useState<string>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<MailingListSchemaType>({
    resolver: zodResolver(mailingListSchema),
  })

  const onSubmit: SubmitHandler<MailingListSchemaType> = async (data) => {
    const res = await fetch("/api/mailing-list", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (res.status !== 200) {
      setResponse("Something went wrong. Please try again later.")
    } else {
      setResponse("Thank you for joining the Mailing List!")
      reset()
    }

    setTimeout(() => {
      setResponse(undefined)
    }, 5000)
  }

  const showConfirmation = !isSubmitted ? false : response ? true : false

  return (
    <form
      className="flex max-w-[35ch] flex-col gap-6 border border-darker bg-lighter px-8 py-6 text-base md:px-6 md:py-4 lg:px-8 lg:py-6 xl:text-lg 3xl:gap-8 3xl:text-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h6 className="mb-4 font-serif text-2xl font-bold tracking-wider xl:text-3xl 3xl:mb-6 3xl:text-4xl">
          {title}
        </h6>
        <p className="text-sm xl:text-base 3xl:text-lg">{description}</p>
      </div>
      <div className="grid gap-2">
        <div className="flex items-end gap-4 3xl:gap-6">
          <UserIcon className="aspect-square h-6 xl:h-7 3xl:h-8" />
          <FloatingLabelInput
            type="text"
            id="mlName"
            placeholder="Full name"
            register={register}
          />
        </div>
        {errors.mlName && (
          <p className="text-sm text-red-600 xl:text-base 3xl:text-lg">
            {errors.mlName?.message}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <div className="flex items-end gap-4 3xl:gap-6">
          <EnvelopeIcon className="aspect-square h-6 xl:h-7 3xl:h-8" />
          <FloatingLabelInput
            type="email"
            id="mlEmail"
            placeholder="Email address"
            register={register}
          />
        </div>
        {errors.mlEmail && (
          <p className="text-sm text-red-600 xl:text-base 3xl:text-lg">
            {errors.mlEmail?.message}
          </p>
        )}
      </div>
      {showConfirmation ? (
        <p className="text-base text-darker xl:text-lg 3xl:text-xl">
          {response}
        </p>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center bg-darker px-5 py-2 font-serif font-semibold tracking-wider text-lighter transition-all hover:bg-darker/90 focus-visible:bg-darker/90 disabled:cursor-not-allowed disabled:bg-darker/90"
        >
          {!isSubmitting ? (
            <span>Join now</span>
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
  type: "text" | "email"
  id: "mlName" | "mlEmail"
  placeholder: string
  register: UseFormRegister<MailingListSchemaType>
}) => {
  return (
    <div className="relative w-full cursor-text">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        // required
        {...register(id)}
        className="peer w-full border-0 border-b border-darker bg-lighter px-0 text-base placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-darker focus:ring-0 xl:text-lg 3xl:text-xl"
      />
      <label
        htmlFor={id}
        className="absolute -top-3 left-0 w-full cursor-text text-sm text-darker placeholder-transparent transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-darker/80 peer-focus-within:-top-3 peer-focus-within:text-sm peer-focus-within:text-darker xl:text-base xl:peer-placeholder-shown:text-lg xl:peer-focus-within:text-base 3xl:text-base 3xl:peer-placeholder-shown:text-xl 3xl:peer-focus-within:text-base"
      >
        {placeholder}
      </label>
    </div>
  )
}

export default MailingList
