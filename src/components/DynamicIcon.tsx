import * as Icons from "lucide-react"
import type { LucideProps } from "lucide-react"

type IconName = keyof typeof Icons

interface DynamicIconProps extends LucideProps {
  name: string
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = Icons[name as IconName] as
    | React.ComponentType<LucideProps>
    | undefined
  if (!Icon) return null
  return <Icon {...props} />
}
