import { Edit, Eye, Trash2 } from "lucide-react";
import { SharedTable, TableAction, TableColumn } from "@/components/SharedTabel";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface User {
    id: number
    name: string
    email: string
    role: string
    status: "active" | "inactive"
    joinedDate: string
}
interface TableWrapperProps {
  searchable?: boolean;
}
const sampleData: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "active",
        joinedDate: "2024-01-15",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "active",
        joinedDate: "2024-02-20",
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Moderator",
        status: "inactive",
        joinedDate: "2024-03-10",
    },
    {
        id: 4,
        name: "Alice Williams",
        email: "alice@example.com",
        role: "User",
        status: "active",
        joinedDate: "2024-04-05",
    },
    {
        id: 5,
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "User",
        status: "inactive",
        joinedDate: "2024-05-12",
    },
]

export default function Table({
  searchable = true, 
}: TableWrapperProps) {
    const { t } = useTranslation()
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const columns: TableColumn<User>[] = [
        {
            key: "name",
            header: t("header.commercialGate"),
            sortable: true,
            className: "font-medium",
        },
        {
            key: "email",
            header: t("auth.email"),
            sortable: true,
        },
        {
            key: "role",
            header: t("role"),
            sortable: true,
            render: (user) => <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>,
        },
        {
            key: "status",
            header: "Status",
            sortable: true,
            render: (user) => <Badge variant={user.status === "active" ? "default" : "outline"}>{user.status}</Badge>,
        },
        {
            key: "joinedDate",
            header: "Joined Date",
            sortable: true,
        },
    ]

    const actions: TableAction<User>[] = [
        {
            key: "view",
            label: "View",
            icon: <Eye className="h-3 w-3" />,
            onClick: (user) => {
                setSelectedUser(user)
                alert(`Viewing user: ${user.name}`)
            },
            className: "hover:bg-primary-50 hover:text-primary-500",
        },
        {
            key: "edit",
            label: "Edit",
            icon: <Edit className="h-3 w-3" />,
            onClick: (user) => {
                alert(`Editing user: ${user.name}`)
            },
            condition: (user) => user.status === "active",
        },
        {
            key: "delete",
            label: "Delete",
            icon: <Trash2 className="h-3 w-3" />,
            onClick: (user) => {
                if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                    alert(`Deleted user: ${user.name}`)
                }
            },
            className: "hover:bg-red-50 hover:text-red-600",
            disabled: (user) => user.role === "Admin",
        },
    ]

    return (
            <div>
                <SharedTable
                    data={sampleData}
                    columns={columns}
                    actions={actions}
                    searchable={searchable}
                    searchPlaceholder="Search by name, email, role, status..."
                    showRowNumbers={true}
                    onRowClick={(user) => console.log("Row clicked:", user)}
                    emptyText="No users found"
                />
            </div>

        
    );
}