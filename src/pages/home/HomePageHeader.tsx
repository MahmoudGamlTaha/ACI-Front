import { Users } from "lucide-react";
import HeaderCard from "./components/HomePageHeaderCard";
import { Earth } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";




export default function Header() {
    const {t} = useTranslation()
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-14">

                <HeaderCard icon={<div style={{color:'var(--color-primary-600)',background:'var(--color-primary-100)'}} className="p-3 rounded-full  "><Earth /></div>} title={t('home.totalShipments')} num={0} />
                <HeaderCard icon={<div style={{color:'var(--color-secondary-500)',background:'var(--color-secondary-100)'}} className="p-3 rounded-full  "><CalendarClock /></div>} title={t('home.activeShipments')} num={0} />
                <HeaderCard icon={<div style={{color:'var(--text-purple-600)',background:'var(--bg-purple-100)'}} className="p-3 rounded-full "><Users /></div>} title={t('home.recordedCompanies')} num={10} />
            </div>
        </div>
    );
}