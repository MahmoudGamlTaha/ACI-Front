import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from "react-i18next";


export default function VervicationSection() {
    const {t} = useTranslation()

    return (
<div  className="bg-white dark:bg-popover rounded-xl shadow-lg p-8 md:p-12">
  <div className="max-w-xl mx-auto text-center">
    <h3 className=" font-bold mb-4 text-black dark:text-white flex items-center justify-center gap-2">
      <span style={{color:'var(--color-primary-600)'}} className="material-symbols-outlined">
        <ShieldCheck />
      </span>
   {t('home.aciVervcation')}
    </h3>
    <p style={{color:'var(--color-neutral-600)'}} className="mb-4">
   {t('home.aciVervcationDesc')}

    </p>
    <div className="flex max-w-md mx-auto">
      <Input
        placeholder={t('home.enterAciNumber')}
        className="w-full px-4 py-2 border border-gray-300 rounded-l-none rounded-r-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        type="text"
        value=""
      />
      <Button variant="primary">
        {t('home.GOVerfication')}
      </Button>
    </div>
    <div className="mt-3  font-semibold h-5 "></div>
  </div>
</div>
    );
}
