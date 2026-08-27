"use server"

import { actionClient } from "@/lib/safeAction"
import { mailingListSchema } from "@/lib/zodSchemas"
import bento from "@/lib/bento"
import type { ActionResult } from "@/lib/actionResult"
import { splitName } from "@/lib/splitName"

export const subscribe = actionClient
  .inputSchema(mailingListSchema)
  .action(
    async ({
      parsedInput: { mlName: name, mlEmail: email },
    }): Promise<ActionResult> => {
      try {
        const user = await bento.V1.Subscribers.getSubscribers({ email })

        if (!user) {
          const { first_name, last_name } = splitName(name)

          await bento.V1.track({
            email,
            type: "$opt.in",
            fields: {
              first_name,
              last_name,
            },
          })

          return {
            ok: true,
            message:
              "Please check your inbox and confirm your subscription to Yogesh Samsi Updates.",
          }
        }

        return {
          ok: true,
          message: "You are already subscribed.",
        }
      } catch (err) {
        console.error(err)
        return {
          ok: false,
          message: "Something went wrong, please try again later.",
        }
      }
    },
  )
