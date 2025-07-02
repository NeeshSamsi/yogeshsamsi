"use server"

import { actionClient } from "@/lib/safeAction"
// import { getXataClient } from "@/lib/xata"
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
        type: "$subscribe",
        fields: {
          first_name,
          last_name,
        },
      })
    } catch (err) {
      console.error(err)
      throw new Error("Something went wrong, please try again later.")
    }
  })
