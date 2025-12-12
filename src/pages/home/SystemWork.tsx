import SystemWorkCard from "./components/SystemWorkCard";
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
                <SystemWorkCard icon={<div className="flex items-center justify-center h-20 w-20 rounded-full bg-cyan-100 text-cyan-600 mx-auto mb-4"><FilePlusCorner /></div>} title={t('home.createRequest')} desc={t('home.createRequestDesc')}/>
                <SystemWorkCard icon={<div className="flex items-center justify-center h-20 w-20 rounded-full bg-cyan-100 text-cyan-600 mx-auto mb-4"><FileSearch /></div>} title={t('home.importerAgree')} desc={t('home.importerAgreeDesc')}/>
                <SystemWorkCard icon={<div className="flex items-center justify-center h-20 w-20 rounded-full bg-cyan-100 text-cyan-600 mx-auto mb-4"><FileSpreadsheet /></div>} title={t('home.customsReview')} desc={t('home.customsAgreeDesc')}/>
                <SystemWorkCard icon={<div className="flex items-center justify-center h-20 w-20 rounded-full bg-cyan-100 text-cyan-600 mx-auto mb-4"><Van className="text-4xl" /></div>} title={t('home.issueAci')} desc={t('home.issueAciDesc')}/>
            </div>
        </div>
    );
}