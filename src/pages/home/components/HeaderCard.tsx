interface Iprops {
    title: string;
    num: number;
    icon: React.ReactNode;
}
export default function HeaderCard({ icon, num, title }: Iprops) {
    return (
        <div className="bg-white shadow-lg rounded-lg min-h-[50px]">
            <div className="flex items-center">
                <div>
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-lg font-bold">{num}</p>
                </div>
            </div>
        </div>
    );
}