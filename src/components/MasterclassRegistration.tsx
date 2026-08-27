"use client"

import { useForm, type SubmitHandler } from "react-hook-form"
import {
  masterclassFormSchema,
  MasterclassFormSchemaType,
} from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerMasterclass } from "@/app/actions/masterclass"
import { redirectTo } from "@/lib/redirectTo"
import { useFormSubmission } from "@/hooks/useFormSubmission"

import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import FloatingLabelInput from "@/components/ui/FloatingLabelInput"
import Spinner from "@/components/ui/Spinner"
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
  const {
    state,
    start,
    succeed,
    fail,
    reset: resetSubmission,
  } = useFormSubmission()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MasterclassFormSchemaType>({
    resolver: zodResolver(masterclassFormSchema),
  })

  const onSubmit: SubmitHandler<MasterclassFormSchemaType> = async (data) => {
    start()
    const res = await registerMasterclass({ ...data, formLink })
    const result = res?.data

    if (!result?.ok) {
      fail("Something went wrong. Please try again or reach out to us.")
    } else if (result.redirect) {
      // Handle redirect to external form.
      redirectTo(result.redirect)
    } else {
      reset()
      // The confirmed "step 2" screen — no auto-dismiss, it stays until the
      // dialog closes.
      succeed("", false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setTimeout(() => {
        reset()
        resetSubmission()
      }, 200)
    }
  }

  // The two-step dialog folds into the submit state: "done" is step 2.
  const currentStep = state.status === "done" ? 2 : 1

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
                  <p className="3xl:text-lg text-sm text-red-600 xl:text-base">
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
                  <p className="3xl:text-lg text-sm text-red-600 xl:text-base">
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
              ) : state.status === "error" ? (
                <p className="text-darker 3xl:text-xl text-base xl:text-lg">
                  {state.message}
                </p>
              ) : (
                <Button
                  variant="primary"
                  theme="darker"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? <span>Continue</span> : <Spinner />}
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
