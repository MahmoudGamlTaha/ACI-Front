import { CheckLineIcon, Eye, PlusIcon, X } from "lucide-react";
import { SharedTable, TableAction, TableColumn } from "@/components/SharedTabel";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import AddRequestForm from "./AddRequestForm";
import { ICreateRequestPayload } from "@/models/createRequest";
import { getAllRequests } from "@/services/create-request/getAllRequests";
import { useUserStore } from "@/stores/useUserStores";
import RequestDetailspopUp from "./RequestDetailspopUp";
import { ConfirmDialog } from "@/components/SharedDialog";
import { ApproveRequest, RejectRequest } from "@/services/create-request/requestApprovments";

interface Iprops {
    status: "ISSUED" | "PENDING" | "APPROVED" | "REJECTED" | "DRAFT";
}

export default function TableContent({ status }: Iprops) {
    const { user: userStore } = useUserStore()
    const { t } = useTranslation()
    const [request, setRequests] = useState<ICreateRequestPayload[]>([])
    const [formDialog, setFormDialog] = useState(false)

    const [viewRequestDialog, setViewRequestDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ICreateRequestPayload | null>(null);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => Promise<void>) | null>(null);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [confirmDescription, setConfirmDescription] = useState("");

    const renderStatusBadge = (status: "ISSUED" | "PENDING" | "APPROVED" | "REJECTED" | "DRAFT") => {
        switch (status) {   
            case "ISSUED":
                return <Badge variant="default" className="bg-chart-3/10 text-chart-3 hover:chart-3/80">{t(`common.${status}`)}</Badge>;
            case "PENDING":
                return <Badge variant="secondary" className="bg-chart-4/10 text-chart-4 hover:bg-chart-4/80">{t(`common.${status}`)}</Badge>;
            case "APPROVED":
                return <Badge variant="default" className="bg-chart-2/10 hover:bg-chart-2/80">{t(`common.${status}`)}</Badge>;
            case "REJECTED":
                return <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20">{t(`common.${status}`)}</Badge>;
            default:
                return <Badge variant="outline" className="bg-destructive hover:bg-destructive/80">{t(`common.${status}`)}</Badge>;
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
            key: "status",
            header: t("exporterDashboard.status"),
            sortable: true,
            render: (row) => renderStatusBadge(row?.status),
        },
        {
            key: "aciNumber",
            header: t("exporterDashboard.aciNumber"),
            sortable: true,
        },
    ]

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

    useEffect(() => {
        fetchRequests()
    }, [])

    const handleView = (row: ICreateRequestPayload) => {
        setSelectedRequest(row);
        setViewRequestDialog(true);
    };

    const handleAccept = (row: ICreateRequestPayload) => {
        setConfirmTitle(t("common.accept"));
        setConfirmDescription(t("common.confirmAction"));
        setConfirmAction(() => async () => {
            try {
                const res = await ApproveRequest((row as any).id!);
                if (res.success) {
                    fetchRequests();
                }
            } catch (error) {
                console.error(error);
            }
        });
        setConfirmDialog(true);
    };

    const handleReject = (row: ICreateRequestPayload) => {
        setConfirmTitle(t("common.reject"));
        setConfirmDescription(t("common.confirmAction"));
        setConfirmAction(() => async () => {
            try {
                const res = await RejectRequest((row as any).id!);
                if (res.success) {
                    fetchRequests();
                }
            } catch (error) {
                console.error(error);
            }
        });
        setConfirmDialog(true);
    };

    const actions: TableAction<ICreateRequestPayload>[] = [
        {
            key: "view",
            label: t("common.view"),
            icon: <Eye className="h-3 w-3" />,
            onClick: (row) => handleView(row),
            className: "hover:bg-primary-50 hover:text-primary-500",
        },
        {
            key: "accept",
            label: t("common.accept"),
            icon: <CheckLineIcon className="h-3 w-3" />,
            onClick: (row) => handleAccept(row),
            condition: (row) => row.status === "ISSUED" && userStore?.userType === 'importer',
            className: "hover:bg-green-50 hover:text-green-600",
        },
        {
            key: "reject",
            label: t("common.reject"),
            icon: <X className="h-3 w-3" />,
            onClick: (row) => handleReject(row),
            condition: (row) => row.status === "ISSUED" && userStore?.userType === 'importer',
            className: "hover:bg-red-50 hover:text-red-600",
        },
    ]

    const filteredRequests = useMemo(() => {
        return request.filter((req) => req.status === status)
    }, [request, status])

    return (
        <div className="bg-background p-6 rounded-xl shadow-lg  ">
            <div className="flex items-center justify-between">
                <h3 className="py-2">{t(`common.${status}`)}</h3>
                <Button variant="primary" onClick={() => setFormDialog(true)}>
                    {t("loggedInHome.newRequest")}
                    <PlusIcon className="size-5 ml-3" />
                </Button>
            </div>
            <SharedTable
                data={filteredRequests}
                columns={columns}
                actions={actions}
                searchable={true}
                searchPlaceholder={t("exporterDashboard.tableSearch")}
                showRowNumbers={true}
                onRowClick={(row) => console.log("Row clicked:", row)}
                emptyText={t("exporterDashboard.emptyText")}
            />

            <AddRequestForm formDialog={formDialog} setFormDialog={setFormDialog} />

            <RequestDetailspopUp
                formDialog={viewRequestDialog}
                setFormDialog={setViewRequestDialog}
                requestData={selectedRequest}
            />

            <ConfirmDialog
                open={confirmDialog}
                onOpenChange={setConfirmDialog}
                title={confirmTitle}
                description={confirmDescription}
                onConfirm={confirmAction || (async () => { })}
                confirmLabel={t("common.yes")}
                cancelLabel={t("common.no")}
            />
        </div>
    );
}