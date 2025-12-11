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
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-11 w-full min-w-0 rounded-sm border bg-transparent px-4 py-2.5 text-base shadow-xs transition outline-none",
                    // When error exists → make border + placeholder red
                    error
                        ? "border-destructive placeholder:text-destructive focus-visible:ring-destructive/40"
                        : "border-gray-300 focus-visible:ring-primary/40",
                    className
                )}
                {...props}
            />

            {error && <p className="text-destructive text-xs">{error}</p>}
        </div>
    );
}

export { Input };
