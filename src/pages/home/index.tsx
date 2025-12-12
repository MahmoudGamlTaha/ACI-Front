import ForwhoSection from "./ForWhoSection";
import ForWhoTitle from "./ForWhoTitle";
import GlobalTradeSection from "./GlobalTradeSection";
import GlobalTradeTitle from "./GlobalTradeTitle";
import Header from "./Header";
import Poster from "./Poster";
import SectionTitles from "./SectionTitles";
import SystemWork from "./SystemWork";
import VervicationSection from "./VervicationSection";

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