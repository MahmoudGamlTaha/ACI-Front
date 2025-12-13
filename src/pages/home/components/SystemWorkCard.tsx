interface Iprops {
    title: string;
    desc: string;
    icon: React.ReactNode;
}
export default function SystemWorkCard({ icon, desc, title }: Iprops) {
    return (
        <div className="text-center p-6 bg-white dark:bg-popover rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <div>
                    {icon}
                </div>
              
                    <div>
                    <h5 className=" font-bold mb-2">{title}</h5>
                </div>
                  <div>
                    <p style={{color:'var(--color-neutral-600)'}}>{desc}</p>
                    </div>
        </div>
    );
}