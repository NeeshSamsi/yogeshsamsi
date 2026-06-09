"use server"

import bento from "@/lib/bento"
import { actionClient } from "@/lib/safeAction"
import { masterclassFormSchema } from "@/lib/zodSchemas"

const FORM_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLSdmgWLRAFY8PxtzH8MF3UxAauI2QCRUwiYjVVbMS0htUwgOQA/viewform"

export const registerAcademy = actionClient
  .inputSchema(masterclassFormSchema)
  .action(
    async ({
      parsedInput: { name, email },
    }): Promise<{ success: boolean; redirect?: string }> => {
      const first_name = name.split(" ")[0]
      const last_name = name.split(" ").slice(1).join(" ")

      const formUrl = `${FORM_BASE}?usp=pp_url&entry.995036545=${encodeURIComponent(name)}&entry.1804772862=${encodeURIComponent(email)}`

      try {
        const user = await bento.V1.Subscribers.getSubscribers({ email })

        // Check if subscriber already has the audience:academy tag
        const tags = await bento.V1.Tags.getTags()
        const academyTag = tags?.find(
          (t) => t.attributes.name === "audience:academy",
        )
        const hasTag =
          academyTag !== undefined &&
          user !== null &&
          user.attributes.cached_tag_ids.includes(academyTag.id)

        if (!hasTag) {
          const registered = await bento.V1.track({
            email,
            type: "$academy.register",
            fields: {
              first_name,
              last_name,
            },
          })

          if (!registered) {
            return { success: false }
          }
        }

        return { success: true, redirect: formUrl }
      } catch (err) {
        console.error(err)
        return { success: false }
      }
    },
  )
