"use server"

import bento from "@/lib/bento"
import { actionClient } from "@/lib/safeAction"
import { botCheckSchema, masterclassFormSchema } from "@/lib/zodSchemas"
import type { ActionResult } from "@/lib/actionResult"
import { splitName } from "@/lib/splitName"
import { isBotSubmission } from "@/lib/botCheck"

const FORM_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLSdmgWLRAFY8PxtzH8MF3UxAauI2QCRUwiYjVVbMS0htUwgOQA/viewform"

export const registerAcademy = actionClient
  .inputSchema(masterclassFormSchema.extend(botCheckSchema.shape))
  .action(
    async ({
      parsedInput: { name, email, company, startedAt },
    }): Promise<ActionResult<"registered">> => {
      // A bot hit never reaches Bento or the real Google Form: no redirect,
      // no `result`, so nothing downstream records it.
      if (isBotSubmission(company, startedAt)) return { ok: true }

      const { first_name, last_name } = splitName(name)

      const formUrl = `${FORM_BASE}?usp=pp_url&entry.995036545=${encodeURIComponent(name)}&entry.1804772862=${encodeURIComponent(email)}`

      try {
        const registered = await bento.V1.track({
          email,
          type: "$academy.register",
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

        return { ok: true, redirect: formUrl, result: "registered" }
      } catch (err) {
        console.error(err)
        return {
          ok: false,
          message: "Something went wrong, please try again later.",
        }
      }
    },
  )
