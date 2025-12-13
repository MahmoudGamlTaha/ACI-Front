import React from "react";
import { useTranslation } from "react-i18next";
import Logo from '../../public/images/logo.png'

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return <div className="p-2 flex items-center justify-between h-[6vh] bg-white dark:bg-popover">
        <p className="text-xs text-gray-500 dark:text-gray-100">{t("footer")}</p>
        <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500 dark:text-gray-100">تحت اشراف</p>
            <img className="w-20 dark:invert" src={Logo} alt="sss" />
        </div>
    </div>;
};
export default Footer;