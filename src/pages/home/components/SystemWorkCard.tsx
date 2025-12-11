interface Iprops {
    title: string;
    desc: string;
    icon: React.ReactNode;
}
export default function SystemWorkCard({ icon, desc, title }: Iprops) {
    return (
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <div>
                    {icon}
                </div>
              
                    <div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                </div>
                  <div>
                    <p className="text-gray-600">{desc}</p>
                    </div>
        </div>
    );
}