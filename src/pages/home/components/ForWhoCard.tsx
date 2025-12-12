interface Iprops {
  title: string;
  desc: string;
  icon: React.ReactNode;
}
export default function ForWhoCard({ icon, desc, title }: Iprops) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-cyan-100 text-cyan-600 rounded-lg text-3xl">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 mt-4">
      {desc}
      </p>
    </div>
  );
}
