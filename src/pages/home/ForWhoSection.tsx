import ForWhoCard from "./components/ForWhoCard";
import { Download } from 'lucide-react';
import { Upload } from 'lucide-react';



export default function ForwhoSection() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-14">

                <ForWhoCard icon={<Upload className="text-3xl" />} title="المصدرون" desc="الجهات خارج ليبيا التي تبيع وتشحن البضائع إلى المستوردين الليبيين." />
                <ForWhoCard icon={<Download />} title="المستوردون" desc="الجهات الليبية التي تشتري وتستلم البضائع من المصدرين الدوليين." />
            </div>
        </div>
    );
}