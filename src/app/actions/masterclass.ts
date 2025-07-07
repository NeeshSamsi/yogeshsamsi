"use server"

import bento from "@/lib/bento"
import reader from "@/lib/keystatic"
import { actionClient } from "@/lib/safeAction"
import { masterclassFormSchema } from "@/lib/zodSchemas"

export const registerMasterclass = actionClient
  .inputSchema(masterclassFormSchema)
  .action(
    async ({
      parsedInput: { name, email },
    }): Promise<{ success: boolean; redirect?: string }> => {
      const first_name = name.split(" ")[0]
      const last_name = name.split(" ").slice(1).join(" ")

      const masterclass = await reader.singletons.masterclass.read({
        resolveLinkedFiles: true,
      })
      if (!masterclass)
        throw new Error("Keystatic Content Not Found - Masterclass Page")
      const { formLink } = masterclass
      if (!formLink) {
        throw new Error("Keystatic Content Not Found - Masterclass Form Link")
      }

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
          return { success: false }
        }
        if (
          !user ||
          !user.attributes.fields?.batch ||
          !user.attributes.fields?.timezone
        ) {
          return { success: true, redirect: formLink }
        } else {
          return { success: true }
        }
      } catch (err) {
        console.error(err)
        return { success: false }
      }
    },
  )
