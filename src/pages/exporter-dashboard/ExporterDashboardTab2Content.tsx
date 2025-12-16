
import ContentCard from "./components/ExporterDashboardContentCardLayout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";




export default function Tab2Content() {
    const {t} = useTranslation()
    return (
        <div>
            <div className="grid grid-cols-1">

                <ContentCard  title={t('loggedInHome.waitingForImporterAgree')}  hr={<hr/>}/>
            </div>
        </div>
    );
}