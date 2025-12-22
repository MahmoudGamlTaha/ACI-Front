import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
}

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-11 w-full min-w-0 rounded-sm border bg-transparent px-4 py-2.5 text-base shadow-xs transition outline-none",

          // 🔴 ERROR STATE → NO ring, NO outline, NO glow (focus + active)
          error
            ? "border-destructive focus:ring-0 focus-visible:ring-0 active:ring-0 focus:outline-none focus-visible:outline-none active:outline-none"
            : "border-gray-300 focus-visible:ring-2 focus-visible:ring-primary",

          className
        )}
        {...props}
      />

      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}


export { Input };
