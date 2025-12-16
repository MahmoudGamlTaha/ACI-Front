import { Earth } from 'lucide-react';
import { Activity } from 'lucide-react';
import { useTranslation } from "react-i18next";



export default function GlobalTradeSection() {
    const {t} = useTranslation()
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-white dark:bg-popover p-8 rounded-xl shadow-lg">
      <div className="flex ">
        <div className="me-4">
          <Earth style={{color:'var(--color-primary-600)'}}  />
        </div>
        <div>
          <h5 className=" font-bold mb-4 flex items-center gap-2 dark:text-white">
            {t('home.importantCustomers')}
          </h5>
        </div>
      </div>
      <div>
        <div className="flex ">
          <div className="me-4">
            <Activity style={{color:'var(--color-primary-600)'}}  />
          </div>
          <div>
            <h5 className=" font-bold mb-4 flex items-center gap-2 dark:text-white">
               
            {t('home.lastActivity')}
               
            </h5>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="pt-1">
              <span className="flex h-3 w-3 relative">
                <span style={{background:'var(--color-primary-400)'}} className="animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75"></span>
                <span style={{background:'var(--color-primary-500)'}} className="relative inline-flex rounded-full h-3 w-3 "></span>
              </span>
            </div>
            <div>
              <p className='text-sm ' style={{color:'var(--color-neutral-800)'}} >
                {t('home.newCompanyEntry')}
              </p>
              <p className='text-xs' style={{color:'var(--color-neutral-400)'}} >{t('home.minutesDate')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
