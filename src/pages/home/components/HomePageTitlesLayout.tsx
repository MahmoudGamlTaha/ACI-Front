interface Iprops {
    title: string;
    desc?: string;
}
export default function SectionTitlesSection({ desc, title }: Iprops) {
    return (
            <div className="flex items-center justify-center flex-col">
                    <h3 className=" font-bold text-black dark:text-white">{title}</h3>
                    <h6 style={{color:'var(--color-neutral-500)'}} className="  max-w-2xl mx-auto mt-2">{desc}</h6>

            </div>
    );
}