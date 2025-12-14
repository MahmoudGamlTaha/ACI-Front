
import HeaderCard from "./components/ContentCard";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";




export default function Tab1Content() {
    const {t} = useTranslation()
    return (
        <div>
            <div className="grid grid-cols-1">

                <HeaderCard input={<Input/>} title={'sama'} btn={<Button/>} hr={<hr/>}/>
            </div>
        </div>
    );
}