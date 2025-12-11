import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RegisterInput } from "@/types/auth"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react"
import { useState } from "react"

export default function SignUp() {
    const [accountType, setAccountType] = useState<'source' | 'importer'>('source')
    const { control, handleSubmit } = useForm<RegisterInput>()
    const { t } = useTranslation();

    const onSubmit = (data: RegisterInput) => {
        console.log(data)
    }
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] ">
            <Card className="w-full max-w-5xl shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{t("auth.newSignUp")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full py-16 px-4 sm:px-6 lg:px-8 ">
                            <div className="max-w-4xl mx-auto">
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
                                                <div onClick={() => setAccountType('source')}
                                                    className={`${accountType === 'source' ? 'bg-primary-500' : 'bg-white dark:bg-gray-800'} hover:ring-3 hover:cursor-pointer hover:ring-primary-500
                                                 transition-all duration-300 w-full border border-border 
                                                 rounded-md-border rounded-md p-4 flex flex-col items-start gap-3 text-foreground`}>
                                                    <div className="p-2 flex justify-start">
                                                        <ArrowUpFromLine className={`size-8 ${accountType === 'source' ? 'text-white' : 'text-black dark:text-white'}`} />
                                                        <p className={`font-bold ${accountType === 'source' ? 'text-white' : 'text-black dark:text-white'}`}>مصدر</p>
                                                    </div>
                                                    <p className={`text-xs text-gray-500 ${accountType === 'source' ? 'text-white' : 'text-black dark:text-white'}`}>الشركات خارج ليبيا المصدرة بضائع إلى ليبيا.</p>
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
                                            <div className="grid grid-cols-2 items-center justify-center gap-2">
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="email">
                                                                {t("auth.email")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="email"
                                                                placeholder="userName@Aci.com"
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="email">
                                                                {t("auth.email")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="email"
                                                                placeholder="userName@Aci.com"
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
                                            <div className="grid grid-cols-2 items-center justify-center gap-2">
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="email">
                                                                {t("auth.email")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="email"
                                                                placeholder="userName@Aci.com"
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
                                                    4. ملف المسؤول
                                                </p>
                                            </div>

                                            {/* Content */}
                                            <div className="grid grid-cols-2 items-center justify-center gap-2">
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="email">
                                                                {t("auth.email")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="email"
                                                                placeholder="userName@Aci.com"
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="email">
                                                                {t("auth.email")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="email"
                                                                placeholder="userName@Aci.com"
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Field>
                                                            <FieldLabel htmlFor="email">
                                                                {t("auth.email")}
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="email"
                                                                placeholder="userName@Aci.com"
                                                                required
                                                            />
                                                        </Field>
                                                    )}
                                                />
                                            </div>
                                            <hr className="my-5" />

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
                                                            أوافق على الشروط والأحكام
                                                        </label>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button size={'lg'} type="submit" className="w-full">
                        {t("auth.signIn")}
                    </Button>
                    <p className="text-center">
                        {t("auth.youDontHaveAccount")}
                        <span>
                            <Button variant="link" className="text-sm" size={'sm'}>
                                {t("auth.signInNow")}
                            </Button>
                        </span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
