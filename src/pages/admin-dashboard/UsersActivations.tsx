import { SharedTable, TableColumn, TableAction } from "@/components/SharedTabel";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { UserRegistration } from "@/models/auth";
import { GetAllUsers } from "@/services/user/getAllUsers";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { ConfirmDialog, SharedDialog } from "@/components/SharedDialog";
import { ApproveUser } from "@/services/user/userApprovments";
import toast from "react-hot-toast";
import UsersDetails from "./UsersDetails";

interface Iprops {
    status: string;
}

export default function UsersActivations({ status }: Iprops) {
    const { t } = useTranslation()
    const [users, setUsers] = useState<UserRegistration[]>([])
    const [loading, setLoading] = useState(false)

    // Dialog state
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserRegistration | null>(null)
    const [pendingStatus, setPendingStatus] = useState<string>("")

    // View Dialog state
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [userToView, setUserToView] = useState<UserRegistration | null>(null)

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case "APPROVED":
                return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200">{status}</Badge>;
            case "PENDING":
                return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">{status}</Badge>;
            case "REJECTED":
                return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">{status}</Badge>;
            default:
                return <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">{status}</Badge>;
        }
    };

    const columns: TableColumn<UserRegistration>[] = [
        {
            key: "fullName",
            header: t("auth.fullName"),
            sortable: true,
            className: "font-medium",
        },
        {
            key: "email",
            header: t("auth.email"),
            sortable: true,
        },
        {
            key: "phone",
            header: t("auth.phoneNumber"),
            sortable: true,
        },
        {
            key: "userType",
            header: t("common.userType"),
            sortable: true,
        },
        {
            key: "registrationStatus",
            header: t("common.activationStatus"),
            sortable: true,
            render: (row) => renderStatusBadge(row.registrationStatus || ""),
        },
    ]

    const handleUpdateStatus = async () => {
        if (!selectedUser || !pendingStatus) return

        try {
            const response = await ApproveUser(selectedUser.id)
            if (response.success) {
                toast.success(t("adminDashboard.approveUserMsg"))
                // Refresh users list
                fetchUsers()
                // Close view dialog if open and it's the same user
                if (viewDialogOpen && userToView?.id === selectedUser.id) {
                    setViewDialogOpen(false)
                }
            } else {
                toast.error(t("adminDashboard.rejectUserMsg"))
            }
        } catch (error) {
            console.error("Failed to update user status:", error)
        }
    }

    const openConfirmDialog = (user: UserRegistration, newStatus: string) => {
        setSelectedUser(user)
        setPendingStatus(newStatus)
        setConfirmOpen(true)
    }

    const openViewDialog = (user: UserRegistration) => {
        setUserToView(user)
        setViewDialogOpen(true)
    }

    const actions: TableAction<UserRegistration>[] = [
        {
            key: "view",
            label: t("common.view"),
            icon: <Eye className="h-4 w-4" />,
            onClick: (row) => openViewDialog(row),
            className: "text-xs text-chart-3 hover:text-chart-3 hover:bg-chart-3/10 border-chart-3",
        },
        {
            key: "approve",
            label: t("common.accept"),
            icon: <CheckCircle className="h-4 w-4" />,
            onClick: (row) => openConfirmDialog(row, "APPROVED"),
            condition: (row) => row.registrationStatus === "PENDING",
            className: "text-xs text-chart-2 hover:text-chart-2 hover:bg-chart-2/10 border-chart-2",
        },
        {
            key: "reject",
            label: t("common.reject"),
            icon: <XCircle className="h-4 w-4" />,
            onClick: (row) => openConfirmDialog(row, "REJECTED"),
            condition: (row) => row.registrationStatus === "PENDING",
            className: "text-xs text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive",
        },
    ]

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await GetAllUsers()
            if (response?.success) {
                setUsers(response?.payload?.content || [])
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="bg-background p-6 rounded-xl shadow-lg  ">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{t(`loggedInHome.${status}`)}</h3>
            </div>
            <SharedTable
                data={users}
                columns={columns}
                actions={actions}
                loading={loading}
                searchable={true}
                searchPlaceholder={t("exporterDashboard.tableSearch")}
                showRowNumbers={true}
                emptyText={t("exporterDashboard.emptyText")}
            />

            <ConfirmDialog
                open={confirmOpen}
                size="md"
                onOpenChange={setConfirmOpen}
                title={t("common.warning")}
                description={t("common.confirmAction")}
                confirmLabel={t("common.yes")}
                cancelLabel={t("common.no")}
                onConfirm={handleUpdateStatus}
                variant={pendingStatus === "REJECTED" ? "destructive" : "primary"}
            />

            <SharedDialog
                open={viewDialogOpen}
                onOpenChange={setViewDialogOpen}
                title={t("adminDashboard.userDetails") || "User Details"}
                size="lg"
            >
                <div className="space-y-4">
                    {userToView && <UsersDetails user={userToView as any} />}
                </div>
            </SharedDialog>
        </div>
    );
}