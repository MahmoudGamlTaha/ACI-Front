
import ContentCard from "./components/ContentCard";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";




export default function Tab1Content() {
    const {t} = useTranslation()
    return (
        <div>
            <div className="grid grid-cols-1">

                <ContentCard  title={'sama'} btn={<Button/>} hr={<hr/>}/>
            </div>
        </div>
    );
}