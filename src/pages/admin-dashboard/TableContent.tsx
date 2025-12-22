import { SharedTable, TableColumn } from "@/components/SharedTabel";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import AddRequestForm from "./AddRequestForm";
import { ICreateRequestPayload } from "@/models/createRequest";
import { getAllRequests } from "@/services/create-request/getAllRequests";
import { useUserStore } from "@/stores/useUserStores";

interface Iprops {
    status: string;
}

export default function TableContent({ status }: Iprops) {
    const { user: userStore } = useUserStore()
    const { t } = useTranslation()
    const [request, setRequests] = useState<ICreateRequestPayload[]>([])
    const [formDialog, setFormDialog] = useState(false)

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case "ISSUED":
                return <Badge variant="default" className="bg-chart-2/10 text-chart-2 hover:chart-2/80">{status}</Badge>;
            case "PENDING":
                return <Badge variant="secondary" className="bg-chart-4/10 text-chart-4 hover:bg-chart-4/80">{status}</Badge>;
            case "APPROVED":
                return <Badge variant="default" className="bg-chart-6/10 hover:bg-chart-6/80">{status}</Badge>;
            case "REJECTED":
                return <Badge variant="destructive" className="bg-chart-7/10 hover:bg-chart-7/80">{status}</Badge>;
            default:
                return <Badge variant="outline" className="bg-chart-8 hover:bg-chart-8/80">{status}</Badge>;
        }
    };

    const columns: TableColumn<ICreateRequestPayload>[] = [
        {
            key: "id",
            header: t("exporterDashboard.appNumber"),
            sortable: true,
            className: "font-medium",
        },
        {
            key: userStore?.userType === 'exporter' ? "toUserId" : "fromUserId",
            header: userStore?.userType === 'exporter' ? t("exporterDashboard.importer") : t("exporterDashboard.exporter"),
            sortable: true,
        },
        {
            key: "productName",
            header: t("exporterDashboard.productName"),
            sortable: true,
            render: (row) => row?.requestDetails[0]?.productName,
        },
        {
            key: "status",
            header: t("exporterDashboard.status"),
            sortable: true,
            render: (row) => renderStatusBadge(row.status || ""),
        },
        {
            key: "referenceNumber",
            header: t("exporterDashboard.aciNumber"),
            sortable: true,
        },

    ]

    // const actions: TableAction<ICreateRequestPayload>[] = [
    //     {
    //         key: "view",
    //         label: "View",
    //         icon: <Eye className="h-3 w-3" />,
    //         onClick: (row) => {
    //             console.log("Viewing request:", row)
    //         },
    //         className: "hover:bg-primary-50 hover:text-primary-500",
    //     },
    //     {
    //         key: "edit",
    //         label: "Edit",
    //         icon: <Edit className="h-3 w-3" />,
    //         onClick: (row) => {
    //             console.log("Editing request:", row)
    //         },
    //         condition: (row) => row.status === "PENDING",
    //     },
    //     {
    //         key: "delete",
    //         label: "Delete",
    //         icon: <Trash2 className="h-3 w-3" />,
    //         onClick: (row) => {
    //             if (confirm(`Are you sure you want to delete request ${row.referenceNumber}?`)) {
    //                 console.log("Deleted request:", row)
    //             }
    //         },
    //         className: "hover:bg-red-50 hover:text-red-600",
    //     },
    // ]

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getAllRequests()
                if (response?.success) {
                    setRequests(response?.payload?.content || [])
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchRequests()
    }, [])

    return (
        <div className="bg-background p-6 rounded-xl shadow-lg  ">
            <div className="flex items-center justify-between">
                <h3 className="py-2">{t(`loggedInHome.${status}`)}</h3>
            </div>
            <SharedTable
                data={request}
                columns={columns}
                // actions={actions}
                searchable={true}
                searchPlaceholder={t("exporterDashboard.tableSearch")}
                showRowNumbers={true}
                onRowClick={(row) => console.log("Row clicked:", row)}
                emptyText={t("exporterDashboard.emptyText")}
            />

            <AddRequestForm formDialog={formDialog} setFormDialog={setFormDialog} />
        </div>
    );
}