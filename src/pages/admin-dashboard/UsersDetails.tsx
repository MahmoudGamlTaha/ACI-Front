import { UserRegistration } from "@/models/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Building,
    FileText,
    CreditCard,
    Globe,
    Briefcase,
    FileCheck
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface UsersDetailsProps {
    user: UserRegistration;
}

export default function UsersDetails({ user }: UsersDetailsProps) {
    const { t } = useTranslation();

    const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value?: string | number | null }) => (
        <div className="flex items-start gap-3 p-2 rounded-lg bg-accent transition-colors">
            <div className="mt-1 p-2 bg-primary-500 rounded-full text-primary">
                <Icon className="size-6 text-primary" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground font-medium">{label}</p>
                <p className="text-md font-semibold text-foreground">{value || "-"}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-2 overflow-y-auto pr-2">
            {/* Personal Information */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <User className="size-8 text-primary-500" />
                        {t("adminDashboard.personalInfo")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <InfoItem icon={User} label={t("auth.fullName")} value={user.fullName} />
                    <InfoItem icon={Mail} label={t("auth.email")} value={user.email} />
                    <InfoItem icon={Phone} label={t("auth.phoneNumber")} value={user.phone} />
                    <InfoItem icon={Globe} label={t("auth.country")} value={user.countryName} />
                    <InfoItem icon={MapPin} label={t("auth.address")} value={user.address} />
                    <InfoItem icon={User} label={t("common.userType")} value={user.userType} />
                </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="size-8 text-primary-500" />
                        {t("adminDashboard.companyInfo")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem icon={Building} label={t("auth.companyEn")} value={user.companyName} />
                    <InfoItem icon={Briefcase} label={t("auth.activityType")} value={user.activityType} />
                    <InfoItem icon={FileText} label={t("auth.comRegister")} value={user.comRegister} />
                    <InfoItem icon={FileText} label={t("auth.idNumber")} value={user.taxNumber} />
                    <InfoItem icon={FileCheck} label={t("auth.companyLicense")} value={user.companyLicense} />
                    <InfoItem icon={User} label={t("auth.commissionerName")} value={user.commissionerName} />
                </CardContent>
            </Card>

            {/* Financial Information */}
            {user.financialDetails && user.financialDetails.length > 0 && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <CreditCard className="size-8 text-primary-500" />
                            {t("adminDashboard.financialInfo")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {user.financialDetails.map((finance, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b last:border-0 pb-4 last:pb-0">
                                <InfoItem icon={Building} label={t("auth.bankName")} value={finance.bankName} />
                                <InfoItem icon={FileText} label={t("auth.accountNumber")} value={finance.accountNumber} />
                                <InfoItem icon={FileText} label={t("auth.ibanNumber")} value={finance.ibanNumber} />
                                <InfoItem icon={FileText} label={t("auth.swiftCode")} value={finance.swiftCode} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
