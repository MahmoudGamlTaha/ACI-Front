import { Input } from "@/components/ui/input";
import { ShieldCheck } from 'lucide-react';

export default function VervicationSection() {
    return (
<div className="bg-gray-50 rounded-xl shadow-lg p-8 md:p-12">
  <div className="max-w-xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-4 text-black flex items-center justify-center gap-2">
      <span className="material-symbols-outlined text-cyan-600">
        <ShieldCheck />
      </span>
      التحقق من رقم ACI
    </h2>
    <p className="mb-4 text-gray-600">التحقق من صلاحية رقم ACI.</p>
    <div className="flex max-w-md mx-auto">
      <Input
        placeholder="أدخل رقم ACI"
        className="w-full px-4 py-2 border border-gray-300 rounded-l-none rounded-r-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        type="text"
        value=""
      />
      <button className="bg-cyan-600 text-white font-bold px-6 py-2 rounded-r-none rounded-l-lg hover:bg-cyan-700 transition-transform hover:scale-105">
        تحقق
      </button>
    </div>
    <div className="mt-3 text-sm font-semibold h-5 "></div>
  </div>
</div>
    );
}
