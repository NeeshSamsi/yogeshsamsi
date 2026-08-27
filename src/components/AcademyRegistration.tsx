"use client"

import { useForm, type SubmitHandler } from "react-hook-form"
import {
  masterclassFormSchema,
  MasterclassFormSchemaType,
} from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerAcademy } from "@/app/actions/academy"
import { redirectTo } from "@/lib/redirectTo"
import { useFormSubmission } from "@/hooks/useFormSubmission"

import { useState } from "react"

import Link from "next/link"

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
import {
  ArrowRightIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/solid"
import { VariantProps } from "class-variance-authority"

interface AcademyRegistrationProps {
  callToAction: VariantProps<typeof buttonVariants>
}

export default function AcademyRegistration({
  callToAction: { variant, theme },
}: AcademyRegistrationProps) {
  const [open, setOpen] = useState(false)
  const { state, start, fail, reset: resetSubmission } = useFormSubmission()

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
    const res = await registerAcademy({ name: data.name, email: data.email })
    const result = res?.data

    if (result?.ok) {
      if (result.redirect) {
        redirectTo(result.redirect)
      }
    } else {
      fail("Something went wrong. Please try again or reach out to us.")
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={variant} theme={theme}>
          <span>Enroll Now</span>
          <span>
            <ArrowRightIcon
              strokeWidth={2.5}
              className="3xl:w-8 aspect-square w-4 sm:w-5 xl:w-6"
            />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Academy Enrollment</DialogTitle>
            <DialogDescription>
              Enter your name and email to begin your enrollment.
            </DialogDescription>
          </DialogHeader>

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

            <p className="text-darker/80 text-sm xl:text-base">
              By enrolling you agree to the{" "}
              <Link
                href="/academy/terms"
                target="_blank"
                className="hover:text-darker underline underline-offset-4 transition-colors"
              >
                Academy Terms of Service
              </Link>
              .
            </p>
          </div>

          <DialogFooter>
            <div className="flex justify-end">
              {state.status === "error" ? (
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
