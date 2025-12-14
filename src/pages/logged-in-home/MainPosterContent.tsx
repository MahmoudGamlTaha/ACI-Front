import { CircleCheckBig, Users } from "lucide-react";
import { CalendarClock } from 'lucide-react';
import { useTranslation } from "react-i18next";
import MainPoster from "./components/MainPoster";
import { Folders } from 'lucide-react';
// import { useTranslation } from "react-i18next";




export default function MainPosterContent() {
    const {t} = useTranslation()
    return (
        <div>
            <h3 className="py-2">{t('loggedInHome.exporterDashboard')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">

                <MainPoster icon={<div style={{color:'var(--color-primary-600)',background:'var(--color-primary-100)'}} className="p-3 rounded-full  "> <Folders /></div>} title={t('loggedInHome.totalRequests')} num={24} />
                <MainPoster icon={<div style={{color:'var(--color-secondary-500)',background:'var(--color-secondary-100)'}} className="p-3 rounded-full  "><CalendarClock /></div>} title={t('loggedInHome.requiredSteps')} num={3} />
                <MainPoster icon={<div style={{color:'var(--text-green-600)',background:'var(--bg-green-100)'}} className="p-3 rounded-full ">    <CircleCheckBig /></div>} title={t('loggedInHome.compeletedShipments')} num={9} />
            </div>
        </div>
    );
}