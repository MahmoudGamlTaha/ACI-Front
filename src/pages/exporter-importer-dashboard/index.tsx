import { useTranslation } from "react-i18next";
import { BookDown, CalendarClock, ChartScatter, CircleCheckBig, FilePlus, Folders, ShieldEllipsis } from "lucide-react";
import { useEffect, useState } from "react";
import TableContent from "./TableContent";
import { useUserStore } from "@/stores/useUserStores";
import { GetRequestCounts } from "@/services/create-request/counts";
import { ICountsApi } from "@/models/createRequest";
import MainPoster, { MainPosterItem } from "@/components/MainPosterCard";
import TabButton, { DrawerMenuItem, TabStatus } from "@/components/TabButtonLayout";



export default function ExporterDashboard() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<TabStatus>("DRAFT");
    const { user: userStore } = useUserStore();

    const [counts, setCounts] = useState<ICountsApi | undefined>(undefined);

    const drawerMenuItems: DrawerMenuItem[] = [
        {
            key: "DRAFT",
            label: t("loggedInHome.draftsRequests"),
            icon: <FilePlus />,
        },
        {
            key: "ISSUED",
            label: t("loggedInHome.waitingForImporterAgree"),
            icon: <CalendarClock />,
        },
        {
            key: "PENDING",
            label: t("loggedInHome.pendingCustomsReview"),
            icon: <ShieldEllipsis />,
        },
        {
            key: "APPROVED",
            label: t("loggedInHome.compeletedShipments"),
            icon: <BookDown />,
        },
        {
            key: "REJECTED",
            label: t("loggedInHome.rejectedRequests"),
            icon: <ChartScatter />,
        },
    ];

    const posterItems: MainPosterItem[] = [
        {
            icon: (
                <div className="p-3 rounded-full text-primary-500 bg-primary-50">
                    <Folders className="size-8" />
                </div>
            ),
            title: t('loggedInHome.totalRequests'),
            num: counts?.totalRequest || 0,
        },
        {
            icon: (
                <div className="p-3 rounded-full text-secondary-500 bg-secondary-100">
                    <CalendarClock className="size-8" />
                </div>
            ),
            title: t('loggedInHome.requiredSteps'),
            num: counts?.fromRequest || 0,
        },
        {
            icon: (
                <div className="p-3 rounded-full text-green-500 bg-green-100">
                    <CircleCheckBig className="size-8" />
                </div>
            ),
            title: t('loggedInHome.compeletedShipments'),
            num: counts?.toRequest || 0,
        },
    ];

    useEffect(() => {
        const fetchCounts = async () => {
            const response = await GetRequestCounts();
            if (response.success) {
                setCounts(response?.payload);
            }
        };
        fetchCounts();
    }, []);

    return (
        <div>
            <h3 className="py-2">
                {
                    userStore?.userType === "exporter" ? t('loggedInHome.exporterDashboard') : t('loggedInHome.importerDashboard')
                }
            </h3>
            <section className="top-sectopn grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {posterItems.map((item, index) => (
                    <MainPoster
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        num={item.num}
                    />
                ))}
            </section>
            <main className="mt-6 grid grid-cols-12 gap-3">
                {/* Sidebar */}
                <section
                    className="
                                col-span-12
                                sm:col-span-4
                                md:col-span-3
                                xl:col-span-3
                                bg-background
                                flex flex-col
                                border-r
                                p-3
                                rounded-xl
                                shadow-lg
                                items-start
                                "
                >
                    <ul className="w-full space-y-2">
                        {drawerMenuItems.map((item) => (
                            <TabButton
                                key={item.key}
                                label={item.label}
                                isActive={activeTab === item.key}
                                onClick={() => setActiveTab(item.key)}
                                icon={item.icon}
                                hidden={item.hidden}
                            />
                        ))}
                    </ul>
                </section>

                {/* Content */}
                <section
                    className="
                                col-span-12
                                sm:col-span-8
                                md:col-span-9 
                                xl:col-span-9
                                bg-background
                                rounded-xl
                                shadow-lg
                                "
                >
                    <TableContent status={activeTab} />
                </section>
            </main>
        </div>

    );
}