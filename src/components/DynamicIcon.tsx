import * as Icons from "lucide-react"
import type { LucideProps } from "lucide-react"

type IconName = keyof typeof Icons

interface DynamicIconProps extends LucideProps {
  name: string
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = Icons[name as IconName] as
    React.ComponentType<LucideProps> | undefined

  if (!Icon) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `DynamicIcon: "${name}" is not a lucide-react icon. Check the Lucide Icon Name field in Keystatic.`,
      )
    }
    console.error(`DynamicIcon: unknown icon "${name}"`)
    return null
  }

  return <Icon {...props} />
}
