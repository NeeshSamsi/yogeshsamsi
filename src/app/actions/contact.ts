"use server"

import { contactFormSchema } from "@/lib/zodSchemas"
import { actionClient } from "@/lib/safeAction"
import sendEmail from "@/lib/sendEmail"

export const contact = actionClient
  .schema(contactFormSchema)
  .action(async ({ parsedInput }) => {
    const { name, email: to, message } = parsedInput

    const userNotification = await sendEmail({
      to,
      name,
      subject: "Thank You for reaching out to Yogesh Samsi",
      message:
        "Thank you for reaching out to Yogesh Samsi through the Website. We will get back to you as soon as we can.",
    })
    const ourNotification = await sendEmail({
      to: "yogeshsamsiofficial@gmail.com",
      name: "Team",
      subject: `New Contact Form Submission: ${name}`,
      message: `New Contact Form Submission\n\nName: ${name}\nEmail: ${to}\nMessage: ${message}`,
    })

    if (!userNotification || userNotification?.rejected.length > 0)
      return { success: false, message: "Error sending user notification" }
    if (!ourNotification || ourNotification?.rejected.length > 0)
      return {
        success: false,
        message: "Error sending Contact Form notification",
      }

    return {
      success: true,
      message: `Successfully submitted ${name}'s Contact Form.`,
    }
  })
