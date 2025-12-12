import ForWhoCard from "./components/ForWhoCard";
import { Download } from 'lucide-react';
import { Upload } from 'lucide-react';
import { useTranslation } from "react-i18next";




export default function ForwhoSection() {
    const {t} = useTranslation()
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-14">

                <ForWhoCard icon={<Upload className="text-3xl" />} title= {t('home.exporters')} desc={t('home.exportersDesc')} />
                <ForWhoCard icon={<Download />} title={t('home.importers')} desc={t('home.importersDesc')} />
            </div>
        </div>
    );
}