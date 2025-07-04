"use client"

import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form"
import {
  masterclassFormSchema,
  MasterclassFormSchemaType,
} from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid"
import Button from "./Button"

export default function MasterclassForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<MasterclassFormSchemaType>({
    resolver: zodResolver(masterclassFormSchema),
  })

  const onSubmit: SubmitHandler<MasterclassFormSchemaType> = async (data) => {
    // const res = await subscribe(data)
    // reset()
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="flex items-end gap-4">
          <UserIcon className="aspect-square h-8" />
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
        <div className="flex items-end gap-4">
          <EnvelopeIcon className="aspect-square h-8" />
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

      <Button as="button" type="Primary" theme="Darker" submit>
        Continue
      </Button>
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
  id: "name" | "email"
  placeholder: string
  register: UseFormRegister<MasterclassFormSchemaType>
}) => {
  return (
    <div className="relative w-full cursor-text">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
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
