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
import { registerMasterclass } from "@/app/actions/masterclass"

import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid"
import { VariantProps } from "class-variance-authority"

interface MasterclassRegistrationProps {
  formLink: string
  callToAction: VariantProps<typeof buttonVariants>
}

export default function MasterclassRegistration({
  formLink,
  callToAction: { variant, theme },
}: MasterclassRegistrationProps) {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formError, setFormError] = useState<string>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<MasterclassFormSchemaType>({
    resolver: zodResolver(masterclassFormSchema),
  })

  const onSubmit: SubmitHandler<MasterclassFormSchemaType> = async (data) => {
    const res = await registerMasterclass({ ...data, formLink })

    if (!res || res.serverError || res.validationErrors || !res.data?.success) {
      setFormError("Something went wrong. Please try again or reach out to us.")

      setTimeout(() => {
        setFormError(undefined)
      }, 5000)
    } else if (res.data?.redirect) {
      // Handle redirect to external form
      window.location.href = res.data.redirect
    } else {
      reset()
      setCurrentStep(2)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setTimeout(() => {
        reset()
        setCurrentStep(1)
      }, 200)
    }
  }

  const showFormError = !isSubmitted ? false : formError ? true : false

  const getDialogContent = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Masterclass Registration Form",
          description: "Please provide your name and email below to register.",
          content: (
            <div className="space-y-6">
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
                  <p className="text-sm text-red-600 xl:text-base 3xl:text-lg">
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
                  <p className="text-sm text-red-600 xl:text-base 3xl:text-lg">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
          ),
        }
      case 2:
        return {
          title: "Welcome back! Your registration is confirmed.",
          description:
            "We've sent an email to your address with payment details and further information to finalise your participation in the Masterclass.",
        }
      default:
        return { title: "", description: "", content: null }
    }
  }

  const dialogContent = getDialogContent()

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={variant} theme={theme}>
          Register now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>

          {dialogContent.content}

          <DialogFooter>
            <div className="flex justify-end">
              {currentStep === 2 ? (
                <Button
                  variant="primary"
                  theme="darker"
                  className="w-full"
                  onClick={() => handleOpenChange(false)}
                >
                  Close
                </Button>
              ) : showFormError ? (
                <p className="text-base text-darker xl:text-lg 3xl:text-xl">
                  {formError}
                </p>
              ) : (
                <Button
                  variant="primary"
                  theme="darker"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    <span>Continue</span>
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
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
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
