import SectionTitlesSection from "./components/SectionTitlesSection";
import { useTranslation } from "react-i18next";

export default function SectionTitles() {
        const {t} = useTranslation()
    return (
        <div>
            <div className="grid grid-cols-1 gap-6 my-12">

                <SectionTitlesSection  title={t('home.systemWork')} desc={t('home.finalAciRelease')} />
            </div>
        </div>
    );
}