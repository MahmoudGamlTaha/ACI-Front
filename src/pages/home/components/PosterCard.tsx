import { Button } from "@/components/ui/button";

interface Iprops {
    title?: string;
    buttonReg?: string;
    buttonLog?: string;
}
export default function PosterCard({ buttonReg, buttonLog, title }: Iprops) {
    return (
        <div className="bg-white dark:bg-popover shadow-lg rounded-lg py-12">
            <div className="flex items-center justify-center">
                <div>
                    <h1 className="  text-black dark:text-white font-bold">{title}</h1>
                       <div className="flex items-center justify-center gap-4 mt-8 flex-col md:flex-row">
                    <Button
                    variant="primary">{buttonReg}</Button>
                    <Button
                    variant="default">{buttonLog}</Button>
                </div>
                </div>

            </div>
        </div>
    );
}