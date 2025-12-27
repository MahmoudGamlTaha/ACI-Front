import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Tooltip } from "../Tooltip"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-all duration-200 ease-in-out hover:scale-101 active:scale-99 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-ring/90 text-white hover:bg-ring/100",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        primary: "bg-primary-500 text-white hover:bg-primary-500/90",
        outline:
          "border bg-background text-foreground dark:text-white hover:bg-accent hover:text-accent-foreground",
        ghost:
          "text-foreground dark:text-white hover:bg-accent hover:text-accent-foreground",
        link:
          "text-gray-500 dark:text-gray-300 underline-offset-4 hover:underline",
      },

      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3",
        xs: "h-6 gap-1.5 px-2",
        lg: "h-10 px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      rounded: {
        md: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
)

type ButtonProps =
  React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    hoverTitle?: string
    tooltipSide?: "top" | "bottom" | "left" | "right"
  }

function Button({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  hoverTitle,
  tooltipSide = "top",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const button = (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    />
  )

  if (!hoverTitle) return button

  return (
    <Tooltip title={hoverTitle} side={tooltipSide}>
      {button}
    </Tooltip>
  )
}

export { Button, buttonVariants }
