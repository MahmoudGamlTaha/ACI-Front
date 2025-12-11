import { Input } from "@/components/ui/input";
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from "react-i18next";


export default function VervicationSection() {
    const {t} = useTranslation()

    return (
<div className="bg-gray-50 rounded-xl shadow-lg p-8 md:p-12">
  <div className="max-w-xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-4 text-black flex items-center justify-center gap-2">
      <span className="material-symbols-outlined text-cyan-600">
        <ShieldCheck />
      </span>
   {t('home.aciVervcation')}
    </h2>
    <p className="mb-4 text-gray-600">
   {t('home.aciVervcationDesc')}

    </p>
    <div className="flex max-w-md mx-auto">
      <Input
        placeholder={t('home.enterAciNumber')}
        className="w-full px-4 py-2 border border-gray-300 rounded-l-none rounded-r-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        type="text"
        value=""
      />
      <button className="bg-cyan-600 text-white font-bold px-6 py-2 rounded hover:bg-cyan-700 transition-transform hover:scale-105">
        {t('home.GOVerfication')}
      </button>
    </div>
    <div className="mt-3 text-sm font-semibold h-5 "></div>
  </div>
</div>
    );
}
