"use server"

import { actionClient } from "@/lib/safeAction"
import { botCheckSchema, mailingListSchema } from "@/lib/zodSchemas"
import bento from "@/lib/bento"
import type { ActionResult } from "@/lib/actionResult"
import { splitName } from "@/lib/splitName"
import { isBotSubmission } from "@/lib/botCheck"

const CONFIRM_MESSAGE =
  "Please check your inbox and confirm your subscription to Yogesh Samsi Updates."

export const subscribe = actionClient
  .inputSchema(mailingListSchema.extend(botCheckSchema.shape))
  .action(
    async ({
      parsedInput: { mlName: name, mlEmail: email, company, startedAt },
    }): Promise<ActionResult<"new" | "existing">> => {
      // A bot hit gets the same success message a genuine new signup would,
      // so there is nothing to tell it apart by - but no `result`, so the
      // client never fires mailing-list-signup for it.
      if (isBotSubmission(company, startedAt))
        return { ok: true, message: CONFIRM_MESSAGE }

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
            message: CONFIRM_MESSAGE,
            result: "new",
          }
        }

        return {
          ok: true,
          message: "You are already subscribed.",
          result: "existing",
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
