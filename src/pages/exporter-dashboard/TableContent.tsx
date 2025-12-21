import { Edit, Eye, PlusIcon, Trash2 } from "lucide-react";
import { SharedTable, TableAction, TableColumn } from "@/components/SharedTabel";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import AddRequestForm from "./AddRequestForm";

interface User {
    id: number
    name: string
    email: string
    role: string
    status: "active" | "inactive"
    joinedDate: string
}



interface Iprops {
    status: string;
}
export default function TableContent({ status }: Iprops) {
    const { t } = useTranslation()
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [formDialog, setFormDialog] = useState(false)

    const columns: TableColumn<User>[] = [
        {
            key: "appNumber",
            header: t("exporterDashboard.appNumber"),
            sortable: true,
            className: "font-medium",
        },
        {
            key: "importer",
            header: t("exporterDashboard.importer"),
            sortable: true,
        },
        {
            key: "status",
            header: t("exporterDashboard.status"),
            sortable: true,
            render: (user) => <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>,
        },
        {
            key: "aciNumber",
            header: t("exporterDashboard.aciNumber"),
            sortable: true,
            render: (user) => <Badge variant={user.status === "active" ? "default" : "outline"}>{user.status}</Badge>,
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
        <div className="bg-background p-6 rounded-xl shadow-lg  ">
            <div className="flex items-center justify-between">
                <h3 className="py-2">{t(`loggedInHome.${status}`)}</h3>
                <Button variant="primary" onClick={() => setFormDialog(true)}>
                    {t("loggedInHome.newRequest")}
                    <PlusIcon className="size-5 ml-3" />
                </Button>
            </div>
            <SharedTable
                data={[]}
                columns={columns}
                actions={actions}
                searchable={true}
                searchPlaceholder={t("exporterDashboard.tableSearch")}
                showRowNumbers={true}
                onRowClick={(user) => console.log("Row clicked:", user)}
                emptyText={t("exporterDashboard.emptyText")}
            />

            <AddRequestForm formDialog={formDialog} setFormDialog={setFormDialog} />
        </div>


    );
}