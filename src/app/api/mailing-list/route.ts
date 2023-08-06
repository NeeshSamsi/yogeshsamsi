import { NextResponse } from "next/server"

import sendEmail from "@/lib/sendEmail"
import { mailingListSchema, MailingListSchemaType } from "@/lib/zodSchemas"

export async function POST(request: Request) {
  const body: MailingListSchemaType = await request.json()

  try {
    mailingListSchema.parse(body)
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 403, statusText: "Invalid response" },
    )
  }

  const { mlName: name, mlEmail: to } = body

  const userNotification = await sendEmail({
    to,
    name,
    subject: "Thank You for Joining the Mailing List - Yogesh Samsi",
    message:
      "Thank you for joining the Yogesh Samsi Mailing List.\n\nWe will keep you updated on Yogesh Ji's upcoming events.\n\nIf you didn't submit your email address to join our mailing list, kindly reach out to this email to be unsubscribed.",
  })
  const ourNotification = await sendEmail({
    to: "yogeshsamsiofficial@gmail.com",
    name: "Team",
    subject: `New Mailing List Subscriber: ${name}`,
    message: `New Mailing List Subscriber\n\nName: ${name}\nEmail: ${to}`,
  })

  if (!userNotification || userNotification?.rejected.length > 0)
    return NextResponse.json(
      { error: "Error sending user notification" },
      { status: 502, statusText: "Bad Gateway" },
    )
  if (!ourNotification || ourNotification?.rejected.length > 0)
    return NextResponse.json(
      { error: "Error subscribing to the Mailing List" },
      { status: 502, statusText: "Bad Gateway" },
    )

  return NextResponse.json(
    { message: `Successfully subscribed ${name} to the Mailing List.` },
    { status: 200, statusText: "Success" },
  )
}
