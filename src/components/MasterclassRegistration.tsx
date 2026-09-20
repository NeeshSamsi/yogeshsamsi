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
import { track } from "@/lib/analytics"
import { readHoneypot } from "@/lib/botCheck"

import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import FloatingLabelInput from "@/components/ui/FloatingLabelInput"
import HoneypotField from "@/components/ui/HoneypotField"
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
  // Reset when the dialog opens (handleOpenChange below), not at page load,
  // so the too-fast bot check (src/lib/botCheck.ts) measures time actually
  // available to fill the form. The lazy initializer keeps the first render
  // pure; handleOpenChange runs in an event handler, not render, so setting
  // it there from Date.now() is fine.
  const [startedAt, setStartedAt] = useState(() => Date.now())

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MasterclassFormSchemaType>({
    resolver: zodResolver(masterclassFormSchema),
  })

  const onSubmit: SubmitHandler<MasterclassFormSchemaType> = async (
    data,
    event,
  ) => {
    start()
    const res = await registerMasterclass({
      ...data,
      formLink,
      company: readHoneypot(event),
      startedAt,
    })
    const result = res?.data

    if (!result?.ok) {
      track("masterclass-register-failed", {})
      fail("Something went wrong. Please try again or reach out to us.")
    } else if (result.redirect) {
      // `result.result` is only set on a genuine registration, never on the
      // bot fake-success (src/lib/botCheck.ts).
      if (result.result) track("masterclass-register", { step: result.result })
      // Handle redirect to external form.
      redirectTo(result.redirect)
    } else {
      if (result.result) track("masterclass-register", { step: result.result })
      reset()
      // The confirmed "step 2" screen — no auto-dismiss, it stays until the
      // dialog closes.
      succeed("", false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      setStartedAt(Date.now())
    } else {
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
          <HoneypotField />
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
