interface Iprops {
    title: string;
    num: number;
    icon: React.ReactNode;
}
export default function HeaderCard({ icon, num, title }: Iprops) {
    return (
        <div className="bg-white p-5 rounded-xl shadow-lg flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center">
                <div className="me-4">
                    {icon}
                </div>
                <div>
                    <h4 className="text-gray-500 text-sm font-semibold">{title}</h4>
                    <p className="text-3xl font-bold text-black">{num}</p>
                </div>
            </div>
        </div>
    );
}