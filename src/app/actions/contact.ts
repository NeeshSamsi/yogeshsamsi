"use server"

import { contactFormSchema } from "@/lib/zodSchemas"
import { actionClient } from "@/lib/safeAction"
import bento from "@/lib/bento"
import type { ActionResult } from "@/lib/actionResult"
import { splitName } from "@/lib/splitName"

const FORMSPARK_URL = "https://submit-form.com/xE2Dj15to"

export const contact = actionClient
  .inputSchema(contactFormSchema)
  .action(async ({ parsedInput }): Promise<ActionResult> => {
    const { name, email, message } = parsedInput

    const { first_name, last_name } = splitName(name)

    try {
      await bento.V1.track({
        email,
        type: "$contact",
        fields: {
          first_name,
          last_name,
        },
        details: {
          message,
        },
      })

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
        return { ok: true }
      }

      console.log(res)
      return {
        ok: false,
        message: "Something went wrong, please try again later.",
      }
    } catch (err) {
      console.error(err)
      return {
        ok: false,
        message: "Something went wrong, please try again later.",
      }
    }
  })
