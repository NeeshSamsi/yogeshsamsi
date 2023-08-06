import { NextResponse } from "next/server"

import sendEmail from "@/lib/sendEmail"
import { contactFormSchema, ContactFormSchemaType } from "@/lib/zodSchemas"

export async function POST(request: Request) {
  const body: ContactFormSchemaType = await request.json()

  try {
    contactFormSchema.parse(body)
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 403, statusText: "Invalid response" },
    )
  }

  const { name, email: to, message } = body

  const userNotification = await sendEmail({
    to,
    name,
    subject: "Thank You for Reaching Out to Yogesh Samsi",
    message:
      "Thank you for reaching out to Yogesh Samsi through the Website. We will get back to you as soon as we can",
  })
  const ourNotification = await sendEmail({
    to: "yogeshsamsiofficial@gmail.com",
    name: "Team",
    subject: `New Contact Form Submission: ${name}`,
    message: `New Mailing List Subscriber\n\nName: ${name}\nEmail: ${to}\nMessage: ${message}`,
  })

  if (!userNotification || userNotification?.rejected.length > 0)
    return NextResponse.json(
      { error: "Error sending user notification" },
      { status: 502, statusText: "Bad Gateway" },
    )
  if (!ourNotification || ourNotification?.rejected.length > 0)
    return NextResponse.json(
      { error: "Error sending Contact Form notification" },
      { status: 502, statusText: "Bad Gateway" },
    )

  return NextResponse.json(
    { message: `Successfully submitted ${name}'s Contact Form.` },
    { status: 200, statusText: "Success" },
  )
}
