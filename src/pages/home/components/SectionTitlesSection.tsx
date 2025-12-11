interface Iprops {
    title: string;
    desc?: string;
}
export default function SectionTitlesSection({ desc, title }: Iprops) {
    return (
            <div className="flex items-center justify-center flex-col">
                    <p className="text-3xl font-bold text-black">{title}</p>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-2">{desc}</p>

            </div>
    );
}