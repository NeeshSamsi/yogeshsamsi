"use server"

import { actionClient } from "@/lib/safeAction"
import { getXataClient } from "@/lib/xata"
import { mailingListSchema } from "@/lib/zodSchemas"

export const subscribe = actionClient
  .schema(mailingListSchema)
  .action(async ({ parsedInput: { mlName: name, mlEmail: email } }) => {
    try {
      // Create a new user if it doesn't exist

      const xata = getXataClient()

      const user = await xata.db.users.getFirst({ filter: { email } })
      if (user) {
        return {
          message: "You are already subscribed to the Mailing List.",
        }
      }

      await xata.db.users.create({
        name,
        email,
      })
      return {
        message: "Thank you for joining the Mailing List!",
      }

      // Update Google Sheet
    } catch (err) {
      console.error(err)
      throw new Error("Something went wrong, please try again later.")
    }
  })
