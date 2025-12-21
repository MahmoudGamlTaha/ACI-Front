import ForwhoSection from "./HomePageForWhoSection";
import ForWhoTitle from "./HomePageForWhoTitle";
import GlobalTradeSection from "./HomePageGlobalTradeSection";
import GlobalTradeTitle from "./HomePageGlobalTradeTitle";
import Header from "./HomePageHeader";
import Poster from "./HomePagePoster";
import SectionTitles from "./HomePageSystemWorkTitleSection";
import SystemWork from "./HomePageSystemWorkSection";
import VervicationSection from "./HomePageVervicationSection";




export default function Home() {
   

    return (
        <div>
           

            <Poster />
            <Header />
            <SectionTitles />
            <SystemWork />
            <GlobalTradeTitle />
            <GlobalTradeSection />
            <ForWhoTitle />
            <ForwhoSection />
            <VervicationSection />
        </div>
    );
}