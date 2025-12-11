import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(

        "w-full px-4 py-2 border border-gray-300 rounded-l-none rounded-r-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition",
        className
      )}
      {...props}
    />
  )
}

export { Input }
