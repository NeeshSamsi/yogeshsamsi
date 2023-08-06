import { z } from "zod"

export const mailingListSchema = z.object({
  mlName: z.string().min(1, "Name is required."),
  mlEmail: z.string().min(1, "Email is required.").email("Invalid email."),
})
export type MailingListSchemaType = z.infer<typeof mailingListSchema>
