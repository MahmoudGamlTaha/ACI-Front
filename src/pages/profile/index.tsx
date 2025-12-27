import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/stores/useUserStores";
import { GetUserById } from "@/services/user/getUserById";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { User, Building, CreditCard, Lock, FileText, ArrowUpFromLine, ArrowDownFromLine, Eye, EyeOff } from "lucide-react";
import FinancialDetailsSection from "../auth/signUp/FinancialDetailsSection";
import { UserRegistrationExt } from "../auth/signUp";
import toast from "react-hot-toast";
import { useLoading } from "@/contexts/LoadingContext";

export default function ProfilePage() {
    const { t } = useTranslation();
    const { user: userStore } = useUserStore();
    const { setLoading } = useLoading();
    const [accountType, setAccountType] = useState<'exporter' | 'importer'>('exporter');
    const [activeTab, setActiveTab] = useState<'general' | 'commercial' | 'financial' | 'security'>('general');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { control, handleSubmit, reset, getValues, watch } = useForm<UserRegistrationExt>({
        defaultValues: {
            acceptTerms: true,
        }
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (userStore?.id) {
                try {
                    const response = await GetUserById(userStore.id);
                    if (response.success && response.payload) {
                        const data = response.payload;
                        setAccountType(data.userType as 'exporter' | 'importer');
                        reset({
                            ...data,
                            confirmPassword: data.passwordHash, // Placeholder
                            acceptTerms: true,
                        } as any);
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            }
        };

        fetchUserData();
    }, [userStore?.id, reset]);

    const onSubmit = async (data: UserRegistrationExt) => {
        setLoading(true);
        try {
            const userData = {
                ...data,
                userType: accountType,
            };
            console.log(userData);

            // const result = await UpdateProfileApi(userData as any);
            // if (result?.success) {
            //     toast.success(t("profile.updateSuccess") || "Profile updated successfully");
            // } else {
            //     toast.error(result?.error || "Something went wrong");
            // }
        } catch (error: any) {
            toast.error(error?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'general', label: t("adminDashboard.personalInfo"), icon: User },
        { id: 'commercial', label: t("adminDashboard.companyInfo"), icon: Building },
        { id: 'financial', label: t("adminDashboard.financialInfo"), icon: CreditCard },
        { id: 'security', label: t("auth.password"), icon: Lock },
    ];

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 space-y-2 ">
                    <div className="p-4 mb-6 bg-card rounded-xl shadow-sm border border-border flex flex-col items-center text-center">
                        <div className="size-20 bg-primary-500/10 rounded-full flex items-center justify-center mb-3">
                            <User className="size-10 text-primary-500" />
                        </div>
                        <h2 className="font-bold text-lg">{watch("fullName") || "User Name"}</h2>
                        <p className="text-sm text-muted-foreground">{watch("email") || "email@example.com"}</p>
                        <div className="mt-3 px-3 py-1 bg-accent rounded-full text-xs font-medium uppercase tracking-wider">
                            {accountType}
                        </div>
                    </div>

                    <nav className="space-y-1 bg-card mt-2 p-4 shadow-sm border border-border rounded-xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                    ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <tab.icon className="size-5" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Card className="border-none shadow-lg">
                            <CardHeader className="border-b border-border/50">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    {tabs.find(t => t.id === activeTab)?.label}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {activeTab === 'general' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Controller
                                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                            name="fullName"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="fullName">{t("auth.fullName")}</FieldLabel>
                                                    <Input {...field} error={fieldState.error?.message} id="fullName" required />
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                            name="companyName"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="companyName">{t("auth.companyEn")}</FieldLabel>
                                                    <Input {...field} error={fieldState.error?.message} id="companyName" required />
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="countryName"
                                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="countryName">{t("auth.country")}</FieldLabel>
                                                    <Input {...field} error={fieldState.error?.message} id="countryName" required />
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="phone"
                                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="phone">{t("auth.phoneNumber")}</FieldLabel>
                                                    <Input {...field} error={fieldState.error?.message} id="phone" required />
                                                </Field>
                                            )}
                                        />

                                        <div className="col-span-full mt-4">
                                            <FieldLabel className="mb-4 block">{t("auth.accountType") || "Account Type"}</FieldLabel>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div onClick={() => setAccountType('exporter')}
                                                    className={`${accountType === 'exporter' ? 'bg-primary-500 border-primary-500' : 'bg-card border-border'} 
                                                    cursor-pointer transition-all duration-300 border rounded-xl p-4 flex flex-col items-center gap-2 text-center`}>
                                                    <ArrowUpFromLine className={`size-6 ${accountType === 'exporter' ? 'text-white' : 'text-muted-foreground'}`} />
                                                    <p className={`font-bold text-sm ${accountType === 'exporter' ? 'text-white' : 'text-foreground'}`}>{t("exporterDashboard.exporter")}</p>
                                                </div>
                                                <div onClick={() => setAccountType('importer')}
                                                    className={`${accountType === 'importer' ? 'bg-primary-500 border-primary-500' : 'bg-card border-border'} 
                                                    cursor-pointer transition-all duration-300 border rounded-xl p-4 flex flex-col items-center gap-2 text-center`}>
                                                    <ArrowDownFromLine className={`size-6 ${accountType === 'importer' ? 'text-white' : 'text-muted-foreground'}`} />
                                                    <p className={`font-bold text-sm ${accountType === 'importer' ? 'text-white' : 'text-foreground'}`}>{t("exporterDashboard.importer")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'commercial' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Controller
                                            name="activityType"
                                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="activityType">{t("auth.activityType")}</FieldLabel>
                                                    <Input {...field} error={fieldState.error?.message} id="activityType" required />
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="comRegister"
                                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="comRegister">{t("auth.comRegister")}</FieldLabel>
                                                    <Input {...field} error={fieldState.error?.message} id="comRegister" required />
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="taxNumber"
                                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="taxNumber">
                                                        {accountType === 'exporter' ? t("auth.idNumber") : t("auth.statisticalCode")}
                                                    </FieldLabel>
                                                    <Input {...field} error={fieldState.error?.message} id="taxNumber" required />
                                                </Field>
                                            )}
                                        />
                                        {accountType === 'importer' && (
                                            <>
                                                <Controller
                                                    name="commissionerName"
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="commissionerName">{t("auth.commissionerName")}</FieldLabel>
                                                            <Input {...field} error={fieldState.error?.message} id="commissionerName" required />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="companyLicense"
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="companyLicense">{t("auth.companyLicense")}</FieldLabel>
                                                            <Input {...field} error={fieldState.error?.message} id="companyLicense" required />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="address"
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="address">{t("auth.address")}</FieldLabel>
                                                            <Input {...field} error={fieldState.error?.message} id="address" required />
                                                        </Field>
                                                    )}
                                                />
                                            </>
                                        )}

                                        <div className="col-span-full">
                                            <Controller
                                                name="attachment"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Field>
                                                        <FieldLabel htmlFor="attachment">{t("auth.attachment")}</FieldLabel>
                                                        <div className="mt-2 flex items-center gap-4">
                                                            <Input
                                                                id="attachment"
                                                                type="file"
                                                                className="flex-1"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) field.onChange(file);
                                                                }}
                                                            />
                                                            {field.value && typeof field.value === 'string' && (
                                                                <a href={field.value} target="_blank" rel="noreferrer" className="text-primary-500 hover:underline text-sm flex items-center gap-1">
                                                                    <FileText className="size-4" />
                                                                    {t("common.view") || "View Current"}
                                                                </a>
                                                            )}
                                                        </div>
                                                        {fieldState.error && <p className="text-destructive text-xs mt-1">{fieldState.error.message}</p>}
                                                    </Field>
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'financial' && (
                                    <FinancialDetailsSection control={control} />
                                )}

                                {activeTab === 'security' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Controller
                                            name="email"
                                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
                                                    <Input {...field} id="email" required error={fieldState.error?.message} />
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="username"
                                            rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="username">{t("auth.username")}</FieldLabel>
                                                    <Input {...field} id="username" required error={fieldState.error?.message} />
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="passwordHash"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="passwordHash">{t("auth.password")}</FieldLabel>
                                                    <div className="relative w-full">
                                                        <Input
                                                            {...field}
                                                            type={showPassword ? "text" : "password"}
                                                            id="passwordHash"
                                                            error={fieldState.error?.message}
                                                            placeholder="••••••••"
                                                            className="pe-12"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                            tabIndex={-1}
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="size-5" />
                                                            ) : (
                                                                <Eye className="size-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="confirmPassword"
                                            control={control}
                                            rules={{
                                                validate: (value) => !value || value === getValues("passwordHash") || t("auth.passwordsNotMatch")
                                            }}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="confirmPassword">{t("auth.confirmPassword")}</FieldLabel>
                                                    <div className="relative w-full">

                                                        <Input
                                                            {...field}
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            id="confirmPassword"
                                                            error={fieldState.error?.message}
                                                            placeholder="••••••••"
                                                            className="pe-12"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                            tabIndex={-1}
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="size-5" />
                                                            ) : (
                                                                <Eye className="size-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </Field>
                                            )}
                                        />
                                    </div>
                                )}

                                <div className="mt-8 flex justify-end gap-3 border-t border-border/50 pt-6">
                                    <Button variant="outline" type="button" onClick={() => reset()}>
                                        {t("common.cancel") || "Cancel"}
                                    </Button>
                                    <Button variant="primary" type="submit" className="px-8">
                                        {t("common.save") || "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </main>
            </div>
        </div>
    );
}
