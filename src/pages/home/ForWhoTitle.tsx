import SectionTitlesSection from "./components/SectionTitlesSection";
import { useTranslation } from "react-i18next";


export default function ForWhoTitle() {
    const {t} = useTranslation()

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 my-12">
                <SectionTitlesSection  title= {t('home.forWhoTitle')} desc= {t('home.forWhoDesc')} />
            </div>
        </div>
    );
}