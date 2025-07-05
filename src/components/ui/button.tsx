import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "py-2 px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 md:px-4 md:gap-3 3xl:py-3 3xl:px-5",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
      },
      theme: {
        light: "",
        lighter: "",
        dark: "",
        darker: "",
      },

      // size: {
      //   default: "h-9 px-4 py-2",
      //   sm: "h-8 rounded-md px-3 text-xs",
      //   lg: "h-10 rounded-md px-8",
      //   icon: "h-9 w-9",
      // },
    },
    compoundVariants: [
      // Primary variants
      {
        variant: "primary",
        theme: "light",
        class: "bg-light text-darker hover:bg-lighter",
      },
      {
        variant: "primary",
        theme: "lighter",
        class: "bg-lighter text-darker hover:bg-light",
      },
      {
        variant: "primary",
        theme: "dark",
        class: "bg-dark text-lighter hover:bg-dark/90",
      },
      {
        variant: "primary",
        theme: "darker",
        class: "bg-darker text-lighter hover:bg-darker/90",
      },
      // Secondary variants
      {
        variant: "secondary",
        theme: "light",
        class: "text-light hover:text-lighter",
      },
      {
        variant: "secondary",
        theme: "lighter",
        class: "text-lighter hover:text-light",
      },
      {
        variant: "secondary",
        theme: "dark",
        class: "text-dark hover:text-dark/80",
      },
      {
        variant: "secondary",
        theme: "darker",
        class: "text-darker hover:text-darker/80",
      },
    ],
    defaultVariants: {
      variant: "primary",
      theme: "light",
      // size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, theme, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, theme, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
