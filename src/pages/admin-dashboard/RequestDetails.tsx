import React from "react";
import { Control, Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SharedTable, TableAction, TableColumn } from "@/components/SharedTabel";
import { Trash2, Plus } from "lucide-react";
import { ICreateRequestPayload, IRequestDetails } from "@/models/createRequest";

interface IRequestDetailsProps {
    control: Control<ICreateRequestPayload>;
}

const RequestDetails: React.FC<IRequestDetailsProps> = ({ control }) => {
    const { t } = useTranslation();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "requestDetails",
    });

    const { control: localControl, handleSubmit: handleLocalSubmit, reset: resetLocal } = useForm<IRequestDetails>({
        defaultValues: {
            hsCode: "",
            productName: "",
            productDescription: "",
            numberOfParcels: 0,
            parcelType: "",
            netWeight: 0,
            grossWeight: 0,
            unitOfWeight: "",
            quantity: 0,
            unitOfQuantity: "",
            unitValue: 0,
            currency: "",
        }
    });

    const onAdd = (data: IRequestDetails) => {
        append(data);
        resetLocal();
    };

    const columns: TableColumn<IRequestDetails>[] = [
        {
            key: "hsCode",
            header: t("exporterDashboard.hsCode"),
            sortable: true,
        },
        {
            key: "productDescription",
            header: t("exporterDashboard.description"),
            sortable: true,
        },
        {
            key: "numberOfParcels",
            header: t("exporterDashboard.parcels"),
            sortable: true,
        },
        {
            key: "netWeight",
            header: t("exporterDashboard.netWeight"),
            sortable: true,
        },
        {
            key: "grossWeight",
            header: t("exporterDashboard.grossWeight"),
            sortable: true,
        },
    ];

    const actions: TableAction<IRequestDetails>[] = [
        {
            key: "delete",
            type: "button",
            label: t("common.delete"),
            className: "text-destructive text-xs border-destructive hover:text-destructive/90",
            icon: <Trash2 className="size-4 text-destructive" />,
            onClick: (item: any) => {
                const index = fields.findIndex(f => f.id === item.id);
                if (index !== -1) remove(index);
            },
        }
    ];

    return (
        <div className="space-y-6">
            <div className="mb-3">
                <p className="text-lg font-medium py-1 w-fit rounded">
                    {t("exporterDashboard.cargoDetails")}
                </p>
            </div>

            <div className="w-full">
                {fields.length > 0 && (
                    <div className="mb-6">
                        <SharedTable<any>
                            searchable={false}
                            data={fields}
                            columns={columns}
                            actions={actions}
                            emptyText={t("exporterDashboard.emptyText")}
                        />
                    </div>
                )}

                <div className="p-4 border border-dashed border-border rounded-lg bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="hsCode"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="hsCode">{t("exporterDashboard.hsCode")} *</FieldLabel>
                                    <Input
                                        {...field}
                                        error={fieldState.error?.message}
                                        id="hsCode" className="bg-white" />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="productName"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="productName">{t("exporterDashboard.productName") || "Product Name"} *</FieldLabel>
                                    <Input {...field} error={fieldState.error?.message} id="productName" className="bg-white" />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="productDescription"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="productDescription">{t("exporterDashboard.description")} *</FieldLabel>
                                    <Input {...field} error={fieldState.error?.message} id="productDescription" className="bg-white" />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="numberOfParcels"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="numberOfParcels">{t("exporterDashboard.parcels")} *</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                        error={fieldState.error?.message}
                                        id="numberOfParcels"
                                        className="bg-white"
                                    />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="parcelType"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="parcelType">{t("exporterDashboard.parcelsType")} *</FieldLabel>
                                    <Input {...field} error={fieldState.error?.message} id="parcelType" className="bg-white" />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="netWeight"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="netWeight">{t("exporterDashboard.netWeight")} *</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                        error={fieldState.error?.message}
                                        id="netWeight"
                                        className="bg-white"
                                    />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="grossWeight"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="grossWeight">{t("exporterDashboard.grossWeight")} *</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                        error={fieldState.error?.message}
                                        id="grossWeight"
                                        className="bg-white"
                                    />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="unitOfWeight"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="unitOfWeight">{t("exporterDashboard.unitOfWeight") || "Unit of Weight"} *</FieldLabel>
                                    <Input {...field} error={fieldState.error?.message} id="unitOfWeight" className="bg-white" />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="quantity"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="quantity">{t("exporterDashboard.quantity") || "Quantity"} *</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                        error={fieldState.error?.message}
                                        id="quantity"
                                        className="bg-white"
                                    />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="unitOfQuantity"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="unitOfQuantity">{t("exporterDashboard.unitOfQuantity") || "Unit of Quantity"} *</FieldLabel>
                                    <Input {...field} error={fieldState.error?.message} id="unitOfQuantity" className="bg-white" />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="unitValue"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="unitValue">{t("exporterDashboard.unitValue") || "Unit Value"} *</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                        error={fieldState.error?.message}
                                        id="unitValue"
                                        className="bg-white"
                                    />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="currency"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="currency">{t("exporterDashboard.currency") || "Currency"} *</FieldLabel>
                                    <Input {...field} error={fieldState.error?.message} id="currency" className="bg-white" />
                                </Field>
                            )}
                        />

                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <Button
                            type="button"
                            onClick={handleLocalSubmit(onAdd)}
                            className="w-full md:w-auto min-w-[200px]"
                            variant="primary"
                        >
                            <Plus className="size-5 me-2" />
                            {t("exporterDashboard.addClause")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetails;
