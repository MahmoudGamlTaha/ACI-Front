import SystemWorkCard from "./components/HomePageSystemWorkCard";
import { Van } from 'lucide-react';
import { FileSearch } from 'lucide-react';
import { FilePlusCorner } from 'lucide-react';
import { FileSpreadsheet } from 'lucide-react';
import { useTranslation } from "react-i18next";






export default function SystemWork() {
    const {t} = useTranslation()
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-14">
                <SystemWorkCard icon={<div style={{background:'var( --color-primary-100)',color:'var(--color-primary-600)'}} className="flex items-center justify-center h-20 w-20 rounded-full  mx-auto mb-4"><FilePlusCorner /></div>} title={t('home.createRequest')} desc={t('home.createRequestDesc')}/>
                <SystemWorkCard icon={<div style={{background:'var( --color-primary-100)',color:'var(--color-primary-600)'}} className="flex items-center justify-center h-20 w-20 rounded-full  mx-auto mb-4"><FileSearch /></div>} title={t('home.importerAgree')} desc={t('home.importerAgreeDesc')}/>
                <SystemWorkCard icon={<div style={{background:'var( --color-primary-100)',color:'var(--color-primary-600)'}} className="flex items-center justify-center h-20 w-20 rounded-full  mx-auto mb-4"><FileSpreadsheet /></div>} title={t('home.customsReview')} desc={t('home.customsAgreeDesc')}/>
                <SystemWorkCard icon={<div style={{background:'var( --color-primary-100)',color:'var(--color-primary-600)'}} className="flex items-center justify-center h-20 w-20 rounded-full  mx-auto mb-4"><Van  /></div>} title={t('home.issueAci')} desc={t('home.issueAciDesc')}/>
            </div>
        </div>
    );
}