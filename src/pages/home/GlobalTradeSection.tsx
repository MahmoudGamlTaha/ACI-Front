import { Earth } from 'lucide-react';
import { Activity } from 'lucide-react';
import { useTranslation } from "react-i18next";



export default function GlobalTradeSection() {
    const {t} = useTranslation()
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-white p-8 rounded-xl shadow-lg">
      <div className="flex ">
        <div className="me-4">
          <Earth className=" text-cyan-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            {t('home.importantCustomers')}
          </h3>
        </div>
      </div>
      <div>
        <div className="flex ">
          <div className="me-4">
            <Activity className=" text-cyan-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
               
            {t('home.lastActivity')}
               
            </h3>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="pt-1">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-800">
                {t('home.newCompanyEntry')}
              </p>
              <p className="text-xs text-gray-400">{t('home.minutesDate')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
