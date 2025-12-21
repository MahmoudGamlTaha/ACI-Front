import React from "react";
import { Control, Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SharedTable, TableAction, TableColumn } from "@/components/SharedTabel";
import { FinancialDetail } from "@/models/auth";
import { Trash2, Plus } from "lucide-react";
import { UserRegistrationExt } from ".";

interface FinancialDetailsSectionProps {
    control: Control<UserRegistrationExt>;
}

const FinancialDetailsSection: React.FC<FinancialDetailsSectionProps> = ({ control }) => {
    const { t } = useTranslation();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "financialDetails",
    });

    // Local form for adding new financial details
    const { control: localControl, handleSubmit: handleLocalSubmit, reset: resetLocal } = useForm<FinancialDetail>({
        defaultValues: {
            bankName: "",
            referenceBank: "",
            swiftCode: "",
            accountNumber: "",
            ibanNumber: "",
        }
    });

    const onAdd = (data: FinancialDetail) => {
        append(data);
        resetLocal();
    };

    const columns: TableColumn<FinancialDetail>[] = [
        {
            key: "bankName",
            header: t("auth.bankName"),
            sortable: true,
        },
        {
            key: "accountNumber",
            header: t("auth.accountNumber"),
            sortable: true,
        },
        {
            key: "ibanNumber",
            header: t("auth.ibanNumber"),
            sortable: true,
        },
        {
            key: "referenceBank",
            header: t("auth.referenceBank"),
            sortable: true,
        },
        {
            key: "swiftCode",
            header: t("auth.swiftCode"),
            sortable: true,
        },
    ];

    const actions: TableAction<FinancialDetail>[] = [
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
            // className: "border-destructive hover:bg-destructive/10",
        }
    ];

    return (
        <div className="space-y-6">
            <div className="mb-3">
                <p className="text-lg font-medium px-3 py-1 w-fit rounded">
                    3. معلومات البنك
                </p>
            </div>

            <div className="col-span-2">
                {fields.length > 0 && <SharedTable<any>
                    searchable={false}
                    data={fields}
                    columns={columns}
                    actions={actions}
                    emptyText={t("auth.noFinancialDetails")}
                />}
                <div className="mt-6 p-4 border border-dashed border-border rounded-lg bg-muted/30">
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-center gap-4">
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="bankName"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="bankName">
                                        {t("auth.bankName")}
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        error={fieldState.error?.message}
                                        id="bankName"
                                    />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="referenceBank"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="referenceBank">
                                        {t("auth.referenceBank")}
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        error={fieldState.error?.message}
                                        id="referenceBank"
                                    />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="swiftCode"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="swiftCode">
                                        {t("auth.swiftCode")}
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        error={fieldState.error?.message}
                                        id="swiftCode"
                                    />
                                </Field>
                            )}
                        />
                        <Controller
                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                            name="accountNumber"
                            control={localControl}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="accountNumber">
                                        {t("auth.accountNumber")}
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        error={fieldState.error?.message}
                                        id="accountNumber"
                                    />
                                </Field>
                            )}
                        />
                        <div className="col-span-2">

                            <Controller
                                rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                name="ibanNumber"
                                control={localControl}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="ibanNumber">
                                            {t("auth.ibanNumber")}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            error={fieldState.error?.message}
                                            id="ibanNumber"
                                        />
                                    </Field>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center pb-1 my-5">
                        <Button
                            type="button"
                            onClick={handleLocalSubmit(onAdd)}
                            className="w-full"
                            variant="primary"
                        >
                            <Plus className="size-6 me-2" />
                            {t("common.add")}
                        </Button>
                    </div>
                    <div className="bg-muted">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialDetailsSection;
