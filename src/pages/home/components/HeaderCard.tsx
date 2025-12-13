interface Iprops {
    title: string;
    num: number;
    icon: React.ReactNode;
}
export default function HeaderCard({ icon, num, title }: Iprops) {
    return (
        <div className="bg-white dark:bg-popover p-5 rounded-xl shadow-lg flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center">
                <div className="me-4">
                    {icon}
                </div>
                <div>
                    <h4 style={{color:'var(--color-neutral-500)'}} className="  font-semibold">{title}</h4>
                    <h3 className="dark:text-white">{num}</h3>
                </div>
            </div>
        </div>
    );
}