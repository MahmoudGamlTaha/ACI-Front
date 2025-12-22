import { useTranslation } from "react-i18next";
import MainPoster from "./components/MainPosterCard";
import { BookDown, CalendarClock, ChartScatter, CircleCheckBig, FilePlus, Folders, ShieldEllipsis } from "lucide-react";
import TabButton from "./components/TabButtonLayout";
import { useEffect, useState } from "react";
import TableContent from "./TableContent";
import { useUserStore } from "@/stores/useUserStores";
import { GetRequestCounts } from "@/services/create-request/counts";
import { ICountsApi } from "@/models/createRequest";

export default function ExporterDashboard() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("draftsRequests");
    const { user: userStore } = useUserStore();

    const [counts, setCounts] = useState<ICountsApi | undefined>(undefined);

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
                <MainPoster
                    icon={
                        <div
                            className="p-3 rounded-full  text-primary-500 bg-primary-50">
                            <Folders className="size-8" />
                        </div>
                    }
                    title={t('loggedInHome.totalRequests')}
                    num={counts?.totalRequest || 0} />
                <MainPoster icon={
                    <div
                        className="p-3 rounded-full  text-secondary-500 bg-secondary-100">
                        <CalendarClock className="size-8" />
                    </div>
                }
                    title={t('loggedInHome.requiredSteps')}
                    num={counts?.fromRequest || 0} />
                <MainPoster
                    icon={
                        <div className="p-3 rounded-full text-green-500 bg-green-100">
                            <CircleCheckBig className="size-8" />
                        </div>
                    }
                    title={t('loggedInHome.compeletedShipments')}
                    num={counts?.toRequest || 0}
                />
            </section>
            <div className="mt-6 grid grid-cols-12 gap-3">
                {/* Sidebar */}
                <section
                    className="
                                col-span-12
                                sm:col-span-4
                                md:col-span-3
                                xl:col-span-2
                                bg-background
                                flex flex-col
                                border-r
                                space-y-2
                                p-3
                                rounded-xl
                                shadow-lg
                                items-start
                                "
                >
                    <TabButton
                        label={t("loggedInHome.draftsRequests")}
                        isActive={activeTab === "draftsRequests"}
                        onClick={() => setActiveTab("draftsRequests")}
                        icon={<FilePlus />}
                    />

                    <TabButton
                        label={t("loggedInHome.waitingForImporterAgree")}
                        isActive={activeTab === "waitingForImporterAgree"}
                        onClick={() => setActiveTab("waitingForImporterAgree")}
                        icon={<CalendarClock />}
                    />

                    <TabButton
                        label={t("loggedInHome.pendingCustomsReview")}
                        isActive={activeTab === "pendingCustomsReview"}
                        onClick={() => setActiveTab("pendingCustomsReview")}
                        icon={<ShieldEllipsis />}
                    />

                    <TabButton
                        label={t("loggedInHome.compeletedShipments")}
                        isActive={activeTab === "compeletedShipments"}
                        onClick={() => setActiveTab("compeletedShipments")}
                        icon={<BookDown />}
                    />

                    <TabButton
                        label={t("loggedInHome.rejectedRequests")}
                        isActive={activeTab === "rejectedRequests"}
                        onClick={() => setActiveTab("rejectedRequests")}
                        icon={<ChartScatter />}
                    />
                </section>

                {/* Content */}
                <section
                    className="
                                col-span-12
                                sm:col-span-8
                                md:col-span-9 
                                xl:col-span-10
                                bg-background
                                rounded-xl
                                shadow-lg
                                "
                >
                    <TableContent status={activeTab} />
                </section>
            </div>

        </div >
    );
}