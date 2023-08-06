import { z } from "zod"

export const mailingListSchema = z.object({
  mlName: z.string().min(1, "Name is required."),
  mlEmail: z.string().min(1, "Email is required.").email("Invalid email."),
})
export type MailingListSchemaType = z.infer<typeof mailingListSchema>

export const contactFormSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().min(1, "Email is required.").email("Invalid email."),
  message: z.string().min(1, "Message is required."),
})
export type ContactFormSchemaType = z.infer<typeof contactFormSchema>
