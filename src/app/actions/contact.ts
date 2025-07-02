"use server"

import { contactFormSchema } from "@/lib/zodSchemas"
import { actionClient } from "@/lib/safeAction"
import bento from "@/lib/bento"

const FORMSPARK_URL = "https://submit-form.com/xE2Dj15to"

export const contact = actionClient
  .inputSchema(contactFormSchema)
  .action(async ({ parsedInput }) => {
    const { name, email, message } = parsedInput

    const first_name = name.split(" ")[0]
    const last_name = name.split(" ").slice(1).join(" ")

    try {
      // await bento.V1.track({
      //   email,
      //   type: "$contact",
      //   fields: {
      //     first_name,
      //     last_name,
      //   },
      //   details: {
      //     message,
      //   },
      // })

      const res = await fetch(FORMSPARK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _email: {
            subject: `New Contact Form Submission: ${name}`,
            from: name,
            replyto: email,
          },
        }),
      })

      if (res.status === 200) {
        console.log(JSON.stringify(res, null, 2))
        return {
          success: true,
        }
      } else {
        throw new Error("Failed to submit, please try again later.")
      }
    } catch (err) {
      console.error(err)
      throw new Error("Something went wrong, please try again later.")
    }
  })
