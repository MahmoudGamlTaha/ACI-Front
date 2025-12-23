import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { UserRegistration } from "@/models/auth"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoading } from "@/contexts/LoadingContext"
import { RegistrationApi } from "@/services/auth/signUpService"
import toast from "react-hot-toast"
import FinancialDetailsSection from "./FinancialDetailsSection"

export interface UserRegistrationExt extends UserRegistration {
    confirmPassword: string;
    acceptTerms: boolean;
}
export default function SignUp() {

    const [accountType, setAccountType] = useState<'exporter' | 'importer'>('exporter')
    const { control, handleSubmit, getValues } = useForm<UserRegistrationExt>()
    const { t } = useTranslation();
    const navigate = useNavigate()
    const { setLoading } = useLoading();

    const handleRegister = async (data: UserRegistrationExt) => {
        setLoading(true);
        try {
            const result = await RegistrationApi(data);
            if (result?.success) {
                setLoading(false);
                toast.success(t("auth.signUpMsg"))
                navigate('/login')
            } else {
                setLoading(false);
                toast.error(result?.error || "Something went wrong")
            }
        } catch (errorMsg: any) {
            setLoading(false);
            toast.error(errorMsg?.error)
        }
    }
    const onSubmit = (data: UserRegistrationExt) => {
        if (!data?.acceptTerms) {
            toast.error(t("auth.acceptTermsError"))
            return;
        }
        const userData = {
            ...data,
            userType: accountType,
        }
        handleRegister(userData);
    }
    return (
        <div className="flex items-center justify-center">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{t("auth.newSignUp")}</CardTitle>
                </CardHeader>
                <CardContent className=" overflow-y-auto">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="w-full px-4 sm:px-6 lg:px-8 ">
                            <div className="max-w-5xl mx-auto">
                                {/* Timeline Container */}
                                <div className="relative mb-5">
                                    {/* Vertical line */}
                                    <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-border"></div>

                                    {/* Timeline items */}
                                    <div className="space-y-10">
                                        <div className="relative ps-18">
                                            {/* Circle marker */}
                                            <div className="absolute start-5 top-0 w-4 h-4 bg-background border-2 border-foreground rounded-full transform -translate-x-1.5"></div>
                                            {/* Date */}
                                            <div className="mb-3">
                                                <p className="text-lg font-medium px-3 py-1 w-fit rounded">
                                                    1. نوع الحساب
                                                </p>
                                                <p className="mt-2 text-gray-500">اختر نوع الشركة التي تمثلها</p>
                                            </div>

                                            {/* Content */}
                                            <div className="grid grid-cols-2 items-center justify-center gap-2">
                                                <div onClick={() => setAccountType('exporter')}
                                                    className={`${accountType === 'exporter' ? 'bg-primary-500' : 'bg-white dark:bg-gray-800'} hover:ring-3 hover:cursor-pointer hover:ring-primary-500
                                                 transition-all duration-300 w-full border border-border 
                                                 rounded-md-border rounded-md p-4 flex flex-col items-start gap-3 text-foreground`}>
                                                    <div className="p-2 flex justify-start">
                                                        <ArrowUpFromLine className={`size-8 ${accountType === 'exporter' ? 'text-white' : 'text-black dark:text-white'}`} />
                                                        <p className={`font-bold ${accountType === 'exporter' ? 'text-white' : 'text-black dark:text-white'}`}>مصدر</p>
                                                    </div>
                                                    <p className={`text-xs text-gray-500 ${accountType === 'exporter' ? 'text-white' : 'text-black dark:text-white'}`}>الشركات خارج ليبيا المصدرة بضائع إلى ليبيا.</p>
                                                </div>
                                                <div onClick={() => setAccountType('importer')}
                                                    className={`${accountType === 'importer' ? 'bg-primary-500' : 'bg-white dark:bg-gray-800'} hover:ring-3 hover:cursor-pointer hover:ring-primary-500 transition-all duration-300 w-full border border-border rounded-md-border rounded-md p-4 flex flex-col items-start gap-3 text-foreground`}>
                                                    <div className="p-2 flex justify-start">
                                                        <ArrowDownFromLine className={`size-8 ${accountType === 'importer' ? 'text-white' : 'text-black dark:text-white'}`} />
                                                        <p className={`font-bold ${accountType === 'importer' ? 'text-white' : 'text-black dark:text-white'}`}>مستورد</p>
                                                    </div>
                                                    <p className={`text-xs text-gray-500 ${accountType === 'importer' ? 'text-white' : 'text-black dark:text-white'}`}>الشركات داخل ليبيا التي تستورد بضائع إلى ليبيا.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mb-5">
                                    {/* Vertical line */}
                                    <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-border"></div>

                                    {/* Timeline items */}
                                    <div className="space-y-10">
                                        <div className="relative ps-18">
                                            {/* Circle marker */}
                                            <div className="absolute start-5 top-0 w-4 h-4 bg-background border-2 border-foreground rounded-full transform -translate-x-1.5"></div>
                                            {/* Date */}
                                            <div className="mb-3">
                                                <p className="text-lg font-medium px-3 py-1 w-fit rounded">
                                                    2. معلومات الشركة
                                                </p>
                                            </div>

                                            {/* Content */}
                                            <div className="grid grid-cols-2 items-start justify-center gap-2">
                                                <Controller
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    name="fullName"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="fullName">
                                                                {t("auth.fullName")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                error={fieldState.error?.message}
                                                                id="fullName"
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    name="companyName"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="companyName">
                                                                {t("auth.companyEn")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                error={fieldState.error?.message}
                                                                id="companyName"
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="countryName"
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field >
                                                            <FieldLabel htmlFor="countryName">
                                                                {t("auth.country")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                error={fieldState.error?.message}
                                                                id="countryName"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="phone"
                                                    rules={{
                                                        required: {
                                                            message: t("auth.fieldRequired"),
                                                            value: true
                                                        },
                                                        pattern: {
                                                            value: /^\d{4,}$/,
                                                            message: t("auth.phoneNumberInvalid"),
                                                        }
                                                    }}
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="phone">
                                                                {t("auth.phoneNumber")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                error={fieldState.error?.message}
                                                                id="phone"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mb-5">
                                    {/* Vertical line */}
                                    <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-border"></div>

                                    {/* Timeline items */}
                                    <div className="space-y-10">
                                        <div className="relative ps-18">
                                            {/* Circle marker */}
                                            <div className="absolute start-5 top-0 w-4 h-4 bg-background border-2 border-foreground rounded-full transform -translate-x-1.5"></div>
                                            {/* Date */}
                                            <div className="mb-3">
                                                <p className="text-lg font-medium px-3 py-1 w-fit rounded">
                                                    3. المعلومات التجارية
                                                </p>
                                            </div>

                                            {/* Content */}
                                            <div className="grid grid-cols-2 items-start justify-center gap-2">
                                                <Controller
                                                    name="activityType"
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="activityType">
                                                                {t("auth.activityType")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                error={fieldState.error?.message}
                                                                id="activityType"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="comRegister"
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="comRegister">
                                                                {t("auth.comRegister")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                error={fieldState.error?.message}
                                                                id="comRegister"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                {accountType === 'exporter' ? (
                                                    <Controller
                                                        name="taxNumber"
                                                        rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                        control={control}
                                                        render={({ field, fieldState }) => (
                                                            <Field>
                                                                <FieldLabel htmlFor="idtaxNumberNumber">
                                                                    {t("auth.idNumber")}
                                                                </FieldLabel>
                                                                <Input
                                                                    {...field}
                                                                    error={fieldState.error?.message}
                                                                    id="taxNumber"
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    required
                                                                />
                                                            </Field>
                                                        )}
                                                    />
                                                ) : (
                                                        <>
                                                            <Controller
                                                            name="taxNumber"
                                                                control={control}
                                                                rules={{
                                                                    required: { message: t("auth.fieldRequired"), value: true }
                                                                }}
                                                                render={({ field, fieldState }) => (
                                                                    <Field>
                                                                        <FieldLabel htmlFor="taxNumber">
                                                                            {t("auth.statisticalCode")}
                                                                        </FieldLabel>
                                                                        <Input
                                                                            {...field}
                                                                            error={fieldState.error?.message}
                                                                            id="taxNumber"
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            required
                                                                        />
                                                                    </Field>
                                                                )}
                                                            />
                                                            <Controller
                                                                rules={{
                                                                    required: { message: t("auth.fieldRequired"), value: true }
                                                                }}
                                                                name="commissionerName"
                                                                control={control}
                                                                render={({ field, fieldState }) => (
                                                                    <Field>
                                                                        <FieldLabel htmlFor="commissionerName">
                                                                            {t("auth.commissionerName")}
                                                                        </FieldLabel>
                                                                        <Input
                                                                            {...field}
                                                                            error={fieldState.error?.message}
                                                                            id="commissionerName"
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            required
                                                                        />
                                                                    </Field>
                                                                )}
                                                            />
                                                            <Controller
                                                                rules={{
                                                                    required: { message: t("auth.fieldRequired"), value: true }
                                                                }}
                                                                name="companyLicense"
                                                                control={control}
                                                                render={({ field, fieldState }) => (
                                                                    <Field>
                                                                        <FieldLabel htmlFor="companyLicense">
                                                                            {t("auth.companyLicense")}
                                                                        </FieldLabel>
                                                                        <Input
                                                                            {...field}
                                                                            error={fieldState.error?.message}
                                                                            id="companyLicense"
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            required
                                                                        />

                                                                    </Field>
                                                                )}
                                                            />
                                                            <Controller
                                                                rules={{
                                                                    required: { message: t("auth.fieldRequired"), value: true }
                                                                }}
                                                                name="address"
                                                                control={control}
                                                                render={({ field, fieldState }) => (
                                                                    <Field>
                                                                        <FieldLabel htmlFor="address">
                                                                            {t("auth.address")}
                                                                        </FieldLabel>
                                                                        <Input
                                                                            {...field}
                                                                            error={fieldState.error?.message}
                                                                            id="address"
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            required
                                                                        />
                                                                    </Field>
                                                                )}
                                                            />
                                                        </>
                                                )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mb-5">
                                    {/* Vertical line */}
                                    <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-border"></div>

                                    {/* Timeline items */}
                                    <div className="space-y-10">
                                        <div className="relative ps-18">
                                            {/* Circle marker */}
                                            <div className="absolute start-5 top-0 w-4 h-4 bg-background border-2 border-foreground rounded-full transform -translate-x-1.5"></div>
                                            <FinancialDetailsSection control={control} />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mb-5">
                                    {/* Vertical line */}
                                    <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-border"></div>

                                    {/* Timeline items */}
                                    <div className="space-y-10">
                                        <div className="relative ps-18">
                                            {/* Circle marker */}
                                            <div className="absolute start-5 top-0 w-4 h-4 bg-background border-2 border-foreground rounded-full transform -translate-x-1.5"></div>
                                            {/* Date */}
                                            <div className="mb-3">
                                                <p className="text-lg font-medium px-3 py-1 w-fit rounded">
                                                    4. معلومات الدخول
                                                </p>
                                            </div>

                                            {/* Content */}
                                            <div className="grid grid-cols-2 items-start justify-center gap-2">
                                                {/* <Controller
                                                    name=""
                                                    control={control}
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="responsibleNameAr">
                                                                {t("auth.responsibleNameAr")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                error={fieldState.error?.message}
                                                                id="responsibleNameAr"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                /> */}

                                                <Controller
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: t("auth.fieldRequired")
                                                        },
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: t("auth.invalidEmail")
                                                        }
                                                    }}
                                                    name="email"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="email">
                                                                {t("auth.email")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="email"
                                                                required
                                                                error={fieldState.error?.message}
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: t("auth.fieldRequired")
                                                        },

                                                    }}
                                                    name="username"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="username">
                                                                {t("auth.username")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="username"
                                                                required
                                                                error={fieldState.error?.message}
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        </Field>
                                                    )}
                                                />

                                                <Controller
                                                    name="passwordHash"
                                                    control={control}
                                                    rules={{ required: { message: t("auth.fieldRequired"), value: true } }}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="passwordHash">
                                                                {t("auth.password")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="passwordHash"
                                                                required
                                                                error={fieldState.error?.message}
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="confirmPassword"
                                                    control={control}
                                                    rules={{
                                                        required: { message: t("auth.fieldRequired"), value: true }
                                                        , validate: (value) => value === getValues("passwordHash") || t("auth.passwordsNotMatch")
                                                    }}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="confirmPassword">
                                                                {t("auth.confirmPassword")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="confirmPassword"
                                                                required
                                                                error={fieldState.error?.message}
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mb-5">
                                    {/* Vertical line */}
                                    <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-border"></div>

                                    {/* Timeline items */}
                                    <div className="space-y-10">
                                        <div className="relative ps-18">
                                            {/* Circle marker */}
                                            <div className="absolute start-5 top-0 w-4 h-4 bg-background border-2 border-foreground rounded-full transform -translate-x-1.5"></div>
                                            {/* Date */}
                                            <div className="mb-3">
                                                <p className="text-lg font-medium px-3 py-1 w-fit rounded">
                                                    5. مرفقات
                                                </p>
                                            </div>

                                            {/* Content */}
                                            <div className="grid grid-cols-1 items-start justify-center gap-2">

                                                <Controller
                                                    name="attachment"
                                                    control={control}
                                                    rules={{
                                                        required: { message: t("auth.fieldRequired"), value: true },
                                                        validate: (value) => {
                                                            if (value && value instanceof File && value.size > 1024 * 1024) {
                                                                return t("auth.fileSizeError");
                                                            }
                                                            return true;
                                                        }
                                                    }}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="attachment">
                                                                {t("auth.attachment")}
                                                            </FieldLabel>
                                                            <Input
                                                                id="attachment"
                                                                type="file"
                                                                required
                                                                error={fieldState.error?.message}
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        field.onChange(file);
                                                                    }
                                                                }}
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                            </div>
                                            <hr className="my-5" />
                                            <p className="text-sm text-gray-500 dark:text-white mb-4">{t("auth.reviewAfterSubmit")}</p>
                                            {/* Terms and Conditions Checkbox */}
                                            <Controller
                                                name="acceptTerms"
                                                control={control}
                                                render={({ field }) => (
                                                    <div className="flex items-center gap-3">
                                                        <Checkbox
                                                            id="acceptTerms"
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                        <label
                                                            htmlFor="acceptTerms"
                                                            className="text-sm font-medium leading-none cursor-pointer select-none"
                                                        >
                                                            {t("auth.acceptTerms")}
                                                        </label>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center items-center gap-3">
                            <Button variant="primary" size={'lg'} type="submit" className="w-xl">
                                {t("auth.signUp")}
                            </Button>
                            <Button
                                onClick={() => navigate("/login")}
                                variant="outline" size={'lg'} type="button" className="w-sm">
                                {t("auth.youHaveAccount")}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
