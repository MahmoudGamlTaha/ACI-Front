import { useTranslation } from "react-i18next";
import PosterCard from "./components/PosterCard";


export default function Poster() {
    const {t} = useTranslation()
    return (
        <div>
            <div className="grid grid-cols-1">

                <PosterCard buttonLog={t('home.login')} buttonReg={t('home.register')} title={t('home.welcome')}  />
            </div>
        </div>
    );
}