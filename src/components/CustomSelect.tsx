"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface SearchableSelectPropsM<T> {
    options: T[]
    value?: T
    displayKey: keyof T
    valueKey: keyof T
    onChange?: (value?: T) => void
    placeholder?: string
    searchPlaceholder?: string
    emptyText?: string
    className?: string
    disabled?: boolean
    inputClassName?: string
}

export function SearchableSelect<T extends Record<string, any>>({
    options,
    value,
    displayKey,
    valueKey,
    onChange,
    placeholder = "Select an option...",
    searchPlaceholder = "Search...",
    emptyText = "No results found.",
    className,
    inputClassName,
    disabled = false,
}: SearchableSelectPropsM<T>) {
    const [open, setOpen] = React.useState(false)

    const selectedValue = value ? String(value[valueKey]) : ""

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size={"lg"}
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between h-11", className)}
                    disabled={disabled}
                >
                    <span className="truncate">
                        {value ? String(value[displayKey]) : placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} className={inputClassName} />
                    <CommandList>
                        <CommandEmpty>{emptyText}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const optionValue = String(option[valueKey])
                                const optionLabel = String(option[displayKey])

                                return (
                                    <CommandItem
                                        key={optionValue}
                                        value={optionLabel}
                                        onSelect={() => {
                                            onChange?.(option)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedValue === optionValue
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {optionLabel}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
