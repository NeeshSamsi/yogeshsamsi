"use server"

import { actionClient } from "@/lib/safeAction"
import { mailingListSchema } from "@/lib/zodSchemas"
import bento from "@/lib/bento"

export const subscribe = actionClient
  .inputSchema(mailingListSchema)
  .action(async ({ parsedInput: { mlName: name, mlEmail: email } }) => {
    const first_name = name.split(" ")[0]
    const last_name = name.split(" ").slice(1).join(" ")

    try {
      await bento.V1.track({
        email,
        type: "$opt.in",
        fields: {
          first_name,
          last_name,
        },
      })

      return {
        success: true,
        message: "Thank you for joining the Mailing List!",
      }
    } catch (err) {
      console.error(err)
      throw new Error("Something went wrong, please try again later.")
    }
  })
