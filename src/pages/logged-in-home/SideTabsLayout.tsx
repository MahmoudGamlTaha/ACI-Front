import { useState } from "react";
import TabButton from "./components/TabButton";
import Tab1Content from "./Tab1Content";
import Tab2Content from "./Tab2Content";
import Tab3Content from "./Tab3Content";
import Tab4Content from "./Tab4Content";
import Tab5Content from "./Tab5Content";
import { BookDown, ChartScatter, Earth } from 'lucide-react';
import MainPosterContent from "./MainPosterContent";
import { FilePlus } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { CalendarClock } from 'lucide-react';
import { ShieldEllipsis } from 'lucide-react';





export default function SideTabsLayout() {
  const [activeTab, setActiveTab] = useState("tab1");
    const { t } = useTranslation()

  return (
    <>
    <MainPosterContent/>
        <div dir="rtl" className="flex flex-col md:flex-row h-screen  my-6">
  
      {/* Sidebar */}
      <div className=" md:w-64 flex flex-col border-r space-y-2 bg-white dark:bg-popover p-3 rounded-xl shadow-lg items-start">
        <TabButton
          label={t("loggedInHome.draftsRequests")}
          isActive={activeTab === "tab1"}
          onClick={() => setActiveTab("tab1")}
          icon={<FilePlus />}
        />

        <TabButton
          label={t("loggedInHome.waitingForImporterAgree")}
          isActive={activeTab === "tab2"}
          onClick={() => setActiveTab("tab2")}
          icon={<CalendarClock />}
        />

        <TabButton
          label={t("loggedInHome.pendingCustomsReview")}
          isActive={activeTab === "tab3"}
          onClick={() => setActiveTab("tab3")}
          icon={<ShieldEllipsis />}
        />
         <TabButton
          label={t("loggedInHome.compeletedShipments")}
          isActive={activeTab === "tab4"}
          onClick={() => setActiveTab("tab4")}
                    icon={<BookDown />}

        />
          <TabButton
          label={t("loggedInHome.rejectedRequests")}
          isActive={activeTab === "tab5"}
          onClick={() => setActiveTab("tab5")}
          icon={    <ChartScatter />
}
        />
      </div>

      {/* Content */}
      <div className="flex-1 mt-6 md:mt-0 md:ps-6 dark:bg-accent">
        {activeTab === "tab1" && <Tab1Content />}
        {activeTab === "tab2" && <Tab2Content />}
        {activeTab === "tab3" && <Tab3Content />}
        {activeTab === "tab4" && <Tab4Content />}
        {activeTab === "tab5" && <Tab5Content />}
      </div>
    </div>
    </>

  );
}
