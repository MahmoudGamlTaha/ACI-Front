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
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useLoading } from "@/contexts/LoadingContext"

export default function ChangePassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: any) => {
        if (!token) {
            toast.error("Invalid or missing token");
            return;
        }

        try {
            setLoading(true);
            // Here you would call your API to reset the password
            console.log("Resetting password with token:", token, "and data:", data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success(t("auth.passwordChangedSuccess") || "Password changed successfully");
            navigate("/login");
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-lg shadow-xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            {t("auth.changePassword") || "Change Password"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <Controller
                                rules={{
                                    required: { value: true, message: t("auth.fieldRequired") },
                                    minLength: { value: 8, message: t("auth.invalidPassword") }
                                }}
                                name="password"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="password">
                                            {t("auth.newPassword") || "Your Password"}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            error={fieldState.error?.message}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                rules={{
                                    required: { value: true, message: t("auth.fieldRequired") },
                                    validate: (value) => value === watch("password") || t("auth.passwordsNotMatch")
                                }}
                                name="confirmPassword"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">
                                            {t("auth.confirmNewPassword") || "Confirm Password"}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            error={fieldState.error?.message}
                                        />
                                    </Field>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size={'lg'} type="submit" className="w-full" variant="primary">
                            {t("common.save") || "Ok"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}