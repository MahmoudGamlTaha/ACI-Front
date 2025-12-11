import { Users } from "lucide-react";
import HeaderCard from "./components/HeaderCard";
import { Earth } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";




export default function Header() {
    const {t} = useTranslation()
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-14">

                <HeaderCard icon={<div className="p-3 rounded-full text-indigo-600 bg-indigo-100"><Earth /></div>} title={t('home.totalShipments')} num={0} />
                <HeaderCard icon={<div className="p-3 rounded-full text-orange-500 bg-orange-100"><CalendarClock /></div>} title={t('home.activeShipments')} num={0} />
                <HeaderCard icon={<div className="p-3 rounded-full text-purple-600 bg-purple-100"><Users /></div>} title={t('home.recordedCompanies')} num={10} />
            </div>
        </div>
    );
}