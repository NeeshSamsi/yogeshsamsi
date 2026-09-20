"use server"

import { z } from "zod"
import bento from "@/lib/bento"
import { actionClient } from "@/lib/safeAction"
import { botCheckSchema, masterclassFormSchema } from "@/lib/zodSchemas"
import type { ActionResult } from "@/lib/actionResult"
import { splitName } from "@/lib/splitName"
import { isBotSubmission } from "@/lib/botCheck"

export const registerMasterclass = actionClient
  .inputSchema(
    masterclassFormSchema
      .extend({
        formLink: z.string().min(1, "Name is required.").url(),
      })
      .extend(botCheckSchema.shape),
  )
  .action(
    async ({
      parsedInput: { name, email, formLink, company, startedAt },
    }): Promise<ActionResult<"new" | "confirmed">> => {
      // A bot hit never reaches Bento or the payment form: no redirect, no
      // `result`, so nothing downstream records it.
      if (isBotSubmission(company, startedAt)) return { ok: true }

      const { first_name, last_name } = splitName(name)

      try {
        const user = await bento.V1.Subscribers.getSubscribers({ email })
        const registered = await bento.V1.track({
          email,
          type: "$masterclass.register",
          fields: {
            first_name,
            last_name,
          },
        })
        if (!registered) {
          return {
            ok: false,
            message: "Something went wrong, please try again later.",
          }
        }
        if (
          !user ||
          !user.attributes.fields?.batch ||
          !user.attributes.fields?.timezone
        ) {
          return { ok: true, redirect: formLink, result: "new" }
        } else {
          return { ok: true, result: "confirmed" }
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
