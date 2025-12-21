import { SharedDialog } from "@/components/SharedDialog";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { SearchableSelect } from "@/components/CustomSelect";
import { useUserStore } from "@/stores/useUserStores";
import { ICreateRequestPayload } from "@/models/createRequest";
import RequestDetails from "./RequestDetails";
import { useEffect, useState } from "react";
import { IUserRequestPayload } from "@/models/users";
import { GetUsers } from "@/services/user/userRequest";

interface Iprops {
    formDialog: boolean;
    setFormDialog: (value: boolean) => void;
}

// Dummy data for countries/partners

const countries = [
    { id: 1, name: "Partner 1", codeChar: "P1" },
    { id: 2, name: "Partner 2", codeChar: "P2" },
];

export default function AddRequestForm({ formDialog, setFormDialog }: Iprops) {
    const { t } = useTranslation();
    const { user } = useUserStore();
    const [users, setUsers] = useState<IUserRequestPayload[]>([]);
    const { control, handleSubmit, reset } = useForm<ICreateRequestPayload>(
        {
            defaultValues: {
                requestDetails: [],
            }
        }
    );

    const onSubmit = (data: ICreateRequestPayload) => {
        console.log(data);
        setFormDialog(false);
        reset();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await GetUsers({
                id: 0,
                limit: 10,
                page: 1,
                sortDirection: "DESC",
                sortBy: "id",
            });
            if (response?.success) {
                console.log(response?.payload?.content, "SSSSS");
                // setUsers(response?.payload?.content);
            }
        };
        fetchUsers();
    }, []);

    return (
        <SharedDialog
            open={formDialog}
            onOpenChange={setFormDialog}
            title={t('exporterDashboard.newAciRequest')}
            size="lg"
            footer={
                <div className="flex w-full justify-end gap-2">
                    <Button form="addRequestForm" variant="primary" type="submit">
                        {t('exporterDashboard.sendForApproval') || "ارسال للموافقة"}
                    </Button>
                </div>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate id="addRequestForm">
                <div className="w-full">
                    <div className="mx-auto">
                        {/* Partners Section */}
                        <div className="relative mb-5 p-4 border rounded-lg">
                            <div className="space-y-10">
                                <div className="relative">
                                    <div className="mb-3">
                                        <p className="text-lg font-medium py-1 w-fit rounded">
                                            {t("exporterDashboard.partners")}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
                                        <Controller
                                            name="toUserId"
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: t("auth.fieldRequired"),
                                                },
                                            }}
                                            render={({ field, fieldState }) => (
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-medium">
                                                        {t("exporterDashboard.importer")} *
                                                    </label>

                                                    <SearchableSelect
                                                        inputClassName="min-w-sm"
                                                        displayKey="name"
                                                        valueKey="id"
                                                        options={countries}
                                                        value={countries.find(c => c.id === Number(field.value))}
                                                        onChange={(option) => field.onChange(option?.id)}
                                                        placeholder={t("exporterDashboard.select")}
                                                        searchPlaceholder="Search..."
                                                        emptyText="No data found"
                                                    />

                                                    {fieldState.error && (
                                                        <p className="text-sm text-red-500">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />

                                        <Controller
                                            name="fromUserId"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-medium">
                                                        {t("exporterDashboard.exporter")} *
                                                    </label>

                                                    <SearchableSelect
                                                        disabled
                                                        inputClassName="min-w-sm"
                                                        displayKey="name"
                                                        valueKey="id"
                                                        options={countries}
                                                        value={countries.find(c => c.id === Number(field.value))}
                                                        onChange={(option) => field.onChange(option?.id)}
                                                        placeholder={user?.userEmail || "manba alkaher (alqhadiahmed@gmail.com)"}
                                                        searchPlaceholder="Search..."
                                                        emptyText="No data found"
                                                    />

                                                    {fieldState.error && (
                                                        <p className="text-sm text-red-500">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipment Details Section */}
                        <div className="relative mb-5 p-4 border rounded-lg">
                            <div className="space-y-10">
                                <div className="relative">
                                    <div className="mb-3">
                                        <p className="text-lg font-medium py-1 w-fit rounded">
                                            {t("exporterDashboard.shipmentDetails")} *
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
                                        <Controller
                                            name="shipTypeId"
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: t("auth.fieldRequired"),
                                                },
                                            }}
                                            render={({ field, fieldState }) => (
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-medium">
                                                        {t("exporterDashboard.shipmentType")} *
                                                    </label>

                                                    <SearchableSelect
                                                        inputClassName="min-w-sm"
                                                        displayKey="name"
                                                        valueKey="id"
                                                        options={countries}
                                                        value={countries.find(c => c.id === Number(field.value))}
                                                        onChange={(option) => field.onChange(option?.id)}
                                                        placeholder={t('exporterDashboard.seashipment')}
                                                        searchPlaceholder="Search countries..."
                                                        emptyText="No data found"
                                                    />

                                                    {fieldState.error && (
                                                        <p className="text-sm text-red-500">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            rules={{
                                                required: {
                                                    message: t("auth.fieldRequired"),
                                                    value: true,
                                                },
                                            }}
                                            name="referenceNumber"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="referenceNumber">
                                                        {t("exporterDashboard.shipmwntFileReview")} *
                                                    </FieldLabel>
                                                    <Input
                                                        className="bg-white"
                                                        {...field}
                                                        error={fieldState.error?.message}
                                                        id="referenceNumber"
                                                        required
                                                    />
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="fromPortId"
                                            rules={{
                                                required: {
                                                    message: t("auth.fieldRequired"),
                                                    value: true,
                                                },
                                            }}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="fromPortId">
                                                        {t("exporterDashboard.shipmentPort")} *
                                                    </FieldLabel>
                                                    <Input
                                                        className="bg-white"
                                                        {...field}
                                                        error={fieldState.error?.message}
                                                        id="fromPortId"
                                                        required
                                                    />
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="toPortId"
                                            control={control}
                                            rules={{
                                                required: {
                                                    message: t("auth.fieldRequired"),
                                                    value: true,
                                                },
                                            }}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="toPortId">
                                                        {t("exporterDashboard.unloadingPort")} *
                                                    </FieldLabel>
                                                    <Input
                                                        className="bg-white"
                                                        {...field}
                                                        error={fieldState.error?.message}
                                                        id="toPortId"
                                                        required
                                                    />
                                                </Field>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cargo Details Section */}
                        <RequestDetails control={control} />

                        {/* Invoice Section */}
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-3">
                                {t("exporterDashboard.invoice")}
                            </h4>
                        </div>
                    </div>
                </div>
            </form>
        </SharedDialog>
    );
}