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

export const masterclassFormSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().min(1, "Email is required.").email("Invalid email."),
})
export type MasterclassFormSchemaType = z.infer<typeof masterclassFormSchema>

// Spliced onto a server action's inputSchema via .extend(botCheckSchema.shape)
// - never onto a form's own zodResolver schema, since no input registers
// these fields and RHF would block every submit waiting for a value that
// never arrives. The client reads both off refs at submit time instead of
// through react-hook-form. See src/lib/botCheck.ts.
export const botCheckSchema = z.object({
  company: z.string().optional(),
  startedAt: z.number(),
})
