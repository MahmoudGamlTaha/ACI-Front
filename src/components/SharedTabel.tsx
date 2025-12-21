"use client"

import { Search, Loader2, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

import type React from "react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
export interface TableColumn<T = any> {
    key: string
    header: string
    translationKey?: string
    render?: (item: T, index: number) => React.ReactNode
    width?: string
    className?: string
    headerClassName?: string
    sortable?: boolean
}

export interface TableAction<T = any> {
    key: string
    label: string
    type?: "button" | "submit" | "reset" | undefined
    translationKey?: string | ((item: T) => string)
    onClick: (item: T, event: React.MouseEvent) => void
    className?: string | ((item: T) => string)
    icon?: React.ReactNode
    condition?: (item: T) => boolean
    disabled?: (item: T) => boolean
    loading?: (item: T) => boolean
    loadingText?: string
    loadingTextTranslationKey?: string
}

export interface StandardTableProps<T = any> {
    data: T[]
    columns: TableColumn<T>[]
    actions?: TableAction<T>[]
    loading?: boolean
    loadingText?: string
    loadingTextTranslationKey?: string
    emptyText?: string
    emptyTextTranslationKey?: string
    className?: string
    tableClassName?: string
    headerClassName?: string
    rowClassName?: string | ((item: T, index: number) => string)
    onRowClick?: (item: T) => void
    processingItemId?: string | number
    showRowNumbers?: boolean
    rowNumberHeader?: string
    rowNumberHeaderTranslationKey?: string
    // New props for complete external control
    showActionsColumn?: boolean
    actionsColumnHeader?: string
    actionsColumnHeaderTranslationKey?: string
    actionsColumnClassName?: string
    actionsContainerClassName?: string
    actionButtonClassName?: string
    loadingSpinnerClassName?: string
    emptyStateClassName?: string
    errorStateClassName?: string
    tableWrapperClassName?: string
    // Search functionality
    searchable?: boolean
    searchPlaceholder?: string
    onSearch?: (query: string) => void
}

export function SharedTable<T extends Record<string, any>>({
    data,
    columns,
    actions,
    loading = false,
    loadingText = "Loading...",
    emptyText = "No data available",
    className,
    tableClassName,
    headerClassName,
    rowClassName,
    onRowClick,
    // processingItemId,
    showRowNumbers = false,
    rowNumberHeader = "#",
    showActionsColumn = true,
    actionsColumnHeader,
    actionsColumnClassName,
    actionsContainerClassName,
    actionButtonClassName,
    loadingSpinnerClassName,
    emptyStateClassName,
    tableWrapperClassName,
    searchable = true,
    searchPlaceholder = "Search...",
    onSearch,
}: StandardTableProps<T>) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("")
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    // Filter data based on search query
    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return data

        const query = searchQuery.toLowerCase()
        return data.filter((item) => {
            // Search across all column values
            return columns.some((column) => {
                const value = item[column.key]
                if (value === null || value === undefined) return false

                // Convert value to string and search
                const stringValue = String(value).toLowerCase()
                return stringValue.includes(query)
            })
        })
    }, [data, searchQuery, columns])

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]

            if (aValue === null || aValue === undefined) return 1
            if (bValue === null || bValue === undefined) return -1

            let comparison = 0
            if (typeof aValue === "string" && typeof bValue === "string") {
                comparison = aValue.localeCompare(bValue)
            } else if (typeof aValue === "number" && typeof bValue === "number") {
                comparison = aValue - bValue
            } else {
                comparison = String(aValue).localeCompare(String(bValue))
            }

            return sortDirection === "asc" ? comparison : -comparison
        })
    }, [filteredData, sortColumn, sortDirection])

    const handleSort = (columnKey: string, sortable?: boolean) => {
        if (sortable === false) return

        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(columnKey)
            setSortDirection("asc")
        }
    }

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
        onSearch?.(value)
    }

    const getRowClassName = (item: T, index: number) => {
        if (typeof rowClassName === "function") {
            return rowClassName(item, index)
        }
        return rowClassName
    }

    const shouldShowAction = (action: any, item: T) => {
        if (action.condition) {
            return action.condition(item)
        }
        return true
    }

    const isActionDisabled = (action: any, item: T) => {
        if (action.disabled) {
            return action.disabled(item)
        }
        return false
    }

    const isActionLoading = (action: any, item: T) => {
        if (action.loading) {
            return action.loading(item)
        }
        return false
    }

    const getActionClassName = (action: any, item: T) => {
        if (typeof action.className === "function") {
            return action.className(item)
        }
        return action.className
    }

    const hasVisibleActions = actions && actions.length > 0

    return (
        <div className={cn("w-full space-y-4 my-2", className)}>
            {/* Search Bar */}
            {searchable && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-foreground" />
                    <Input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-9 text-sidebar-foreground"
                    />
                </div>
            )}

            {/* Table Wrapper */}
            <div className={cn("rounded-md border", tableWrapperClassName)}>
                <Table className={tableClassName}>
                    <TableHeader>
                        <TableRow className={cn("bg-primary", headerClassName)}>
                            {showRowNumbers && <TableHead className="w-[50px]">{rowNumberHeader}</TableHead>}
                            {columns.map((column) => (
                                <TableHead key={column.key} className={cn(column.headerClassName)} style={{ width: column.width }}>
                                    <div
                                        className={cn("flex items-center gap-2", column.sortable !== false && "cursor-pointer select-none")}
                                        onClick={() => handleSort(column.key, column.sortable)}
                                    >
                                        {column.header}
                                        {column.sortable !== false && sortColumn === column.key && (
                                            <span className="ml-auto">
                                                {sortDirection === "asc" ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                            {hasVisibleActions && showActionsColumn && (
                                <TableHead className={actionsColumnClassName}>{actionsColumnHeader || t("common.actions")}</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (showRowNumbers ? 1 : 0) + (hasVisibleActions && showActionsColumn ? 1 : 0)}
                                    className="h-24 text-center"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className={cn("h-4 w-4 animate-spin", loadingSpinnerClassName)} />
                                        <span>{loadingText}</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : sortedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (showRowNumbers ? 1 : 0) + (hasVisibleActions && showActionsColumn ? 1 : 0)}
                                    className={cn("h-24 text-center", emptyStateClassName)}
                                >
                                    {emptyText}
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedData.map((item, index) => (
                                <TableRow
                                    key={index}
                                    className={cn(onRowClick && "cursor-pointer hover:bg-muted/50", getRowClassName(item, index))}
                                    onClick={() => onRowClick?.(item)}
                                >
                                    {showRowNumbers && <TableCell className="font-medium">{index + 1}</TableCell>}
                                    {columns.map((column) => (
                                        <TableCell key={column.key} className={cn("dark:text-white", column.className)} style={{ width: column.width }}>
                                            {column.render ? column.render(item, index) : String(item[column.key] ?? "")}
                                        </TableCell>
                                    ))}
                                    {hasVisibleActions && showActionsColumn && (
                                        <TableCell className={actionsColumnClassName}>
                                            <div
                                                className={cn("flex items-center gap-2", actionsContainerClassName)}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {actions?.map((action) => {
                                                    if (!shouldShowAction(action, item)) return null

                                                    const isDisabled = isActionDisabled(action, item)
                                                    const isLoading = isActionLoading(action, item)

                                                    return (
                                                        <Button
                                                            type={action.type}
                                                            key={action.key}
                                                            variant="outline"
                                                            size="xs"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                if (!isDisabled && !isLoading) {
                                                                    action.onClick(item, e)
                                                                }
                                                            }}
                                                            disabled={isDisabled || isLoading}
                                                            className={cn(actionButtonClassName, getActionClassName(action, item))}
                                                        >
                                                            {isLoading ? (
                                                                <>
                                                                    <Loader2 className="h-3 w-3 animate-spin mr-2" />
                                                                    {action.loadingText || "Loading..."}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {action.icon && <span className="mr-2">{action.icon}</span>}
                                                                    {action.label}
                                                                </>
                                                            )}
                                                        </Button>
                                                    )
                                                })}
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Results counter */}
            {searchable && searchQuery && (
                <div className="text-sm text-muted-foreground">
                    Found {sortedData.length} of {data.length} results
                </div>
            )}
        </div>
    )
}
