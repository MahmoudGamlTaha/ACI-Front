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
import { LoginInput } from "@/types/auth"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const { control, handleSubmit } = useForm<LoginInput>()
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onSubmit = (data: LoginInput) => {
        console.log(data)
    }
    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)] ">
            <Card className="w-full max-w-lg shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{t("auth.signIn")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
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
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel htmlFor="password">{t("auth.password")}</FieldLabel>
                                        <Input
                                            {...field}
                                            id="password"
                                            placeholder="Password"
                                            type="password"
                                        />
                                    </Field>
                                )}
                            />
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
                            <Button variant="link" className="text-sm" size={'sm'} onClick={() => navigate('/sign-up')}>
                                {t("auth.signInNow")}
                            </Button>
                        </span>
                    </p>
                    <div className="dark:bg-gray-800 bg-gray-50 border border-gray-200 rounded-xl p-5 w-full max-w-md text-right leading-7">
                        <p className="font-semibold dark:text-white text-gray-700 mb-2">
                            حسابات تجريبية <span className="font-normal">(كلمة المرور: 123456)</span>
                        </p>

                        <ul className=" dark:text-white space-y-1 text-xs text-gray-600 text-right">
                            <li className="flex gap-2">
                                <span className="">•</span>
                                <span className="font-semibold">مصدر:</span>
                                <span>exporter@test.com</span>
                            </li>

                            <li className="flex gap-2">
                                <span>•</span>
                                <span className="font-semibold">مستورد:</span>
                                <span>importer@test.com</span>
                            </li>

                            <li className="flex gap-2">
                                <span>•</span>
                                <span className="font-semibold">مسؤول النظام:</span>
                                <span>admin@aci.gov.ly</span>
                            </li>

                            <li className="flex gap-2">
                                <span>•</span>
                                <span className="font-semibold">البنك المركزي:</span>
                                <span>bank@cbl.gov.ly</span>
                            </li>

                            <li className="flex gap-2">
                                <span>•</span>
                                <span className="font-semibold">شبكة ليبيا:</span>
                                <span>Itnet@itnet.gov.ly</span>
                            </li>

                            <li className="flex gap-2">
                                <span>•</span>
                                <span className="font-semibold">ضابط جمارك:</span>
                                <span>customs-officer@aci.gov.ly</span>
                            </li>
                        </ul>

                        <p className="dark:text-white mt-3 text-xs font-semibold text-gray-700">
                            كلمة المرور: <span className="font-normal">123456</span>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
