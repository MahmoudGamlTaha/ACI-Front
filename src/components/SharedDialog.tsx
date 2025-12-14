"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface SharedDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    children: React.ReactNode
    size?: "sm" | "md" | "lg" | "full"
    showCloseButton?: boolean
    closeOnOutsideClick?: boolean
    closeOnEscape?: boolean
    footer?: React.ReactNode
    headerClassName?: string
    contentClassName?: string
    overlayClassName?: string
    footerClassName?: string
    position?: "center" | "top" | "bottom"
    animation?: "scale" | "slide" | "fade"
}

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-3xl",
    lg: "max-w-6xl",
    full: "max-w-[95vw] h-[95vh]",
}

const positionClasses = {
    center: "items-center",
    top: "items-start pt-20",
    bottom: "items-end pb-20",
}

const animationClasses = {
    scale: "animate-in fade-in-0 zoom-in-95",
    slide: "animate-in slide-in-from-bottom-4 fade-in-0",
    fade: "animate-in fade-in-0",
}

export function SharedDialog({
    open,
    onOpenChange,
    title,
    description,
    children,
    size = "md",
    showCloseButton = true,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    footer,
    headerClassName,
    contentClassName,
    overlayClassName,
    footerClassName,
    position = "center",
    animation = "scale",
}: SharedDialogProps) {
    const dialogRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && closeOnEscape && open) {
                onOpenChange(false)
            }
        }

        if (open) {
            document.addEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "unset"
        }
    }, [open, closeOnEscape, onOpenChange])

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOutsideClick && e.target === e.currentTarget) {
            onOpenChange(false)
        }
    }

    if (!open) return null

    return (
        <div
            className={cn("fixed inset-0 z-50 flex", positionClasses[position], "justify-center p-4")}
            onClick={handleOverlayClick}
        >
            {/* Overlay */}
            <div
                className={cn("fixed inset-0 bg-black/60 backdrop-blur-sm", "animate-in fade-in-0", overlayClassName)}
                aria-hidden="true"
            />

            {/* Dialog */}
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "dialog-title" : undefined}
                aria-describedby={description ? "dialog-description" : undefined}
                className={cn(
                    "relative z-50 w-full",
                    sizeClasses[size],
                    "bg-popover text-popover-foreground",
                    "rounded-lg border border-border shadow-lg",
                    "flex flex-col",
                    size === "full" ? "overflow-hidden" : "max-h-[90vh]",
                    animationClasses[animation],
                    "duration-200",
                )}
            >
                {/* Header */}
                {(title || description || showCloseButton) && (
                    <div
                        className={cn(
                            "flex items-start justify-between gap-4",
                            "px-6 py-4 border-b border-border",
                            headerClassName,
                        )}
                    >
                        <div className="flex-1 space-y-1">
                            {title && (
                                <h2 id="dialog-title" className="text-lg font-semibold leading-none tracking-tight">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p id="dialog-description" className="text-sm text-muted-foreground">
                                    {description}
                                </p>
                            )}
                        </div>
                        {showCloseButton && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 shrink-0 rounded-sm opacity-70 hover:opacity-100"
                                onClick={() => onOpenChange(false)}
                                aria-label="Close dialog"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className={cn("flex-1 overflow-auto px-6 py-4", contentClassName)}>{children}</div>

                {/* Footer */}
                {footer && (
                    <div
                        className={cn(
                            "flex items-center gap-2",
                            "px-6 py-4 border-t border-border",
                            "bg-muted/30",
                            footerClassName,
                        )}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}

export interface ConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void | Promise<void>
    variant?: "primary" | "destructive"
    size?: SharedDialogProps["size"]
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    variant = "primary",
    size = "sm",
}: ConfirmDialogProps) {
    const [isLoading, setIsLoading] = React.useState(false)

    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            await onConfirm()
            onOpenChange(false)
        } catch (error) {
            console.error("Confirmation error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SharedDialog
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            size={size}
            footer={
                <div className="flex w-full justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={variant === "destructive" ? "destructive" : "primary"}
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : confirmLabel}
                    </Button>
                </div>
            }
        >
            <div className="text-sm text-muted-foreground">{description}</div>
        </SharedDialog>
    )
}
