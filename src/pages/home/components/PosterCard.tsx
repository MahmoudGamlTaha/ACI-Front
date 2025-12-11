import { Button } from "@/components/ui/button";

interface Iprops {
    title?: string;
    buttonReg?: string;
    buttonLog?: string;
}
export default function PosterCard({ buttonReg, buttonLog, title }: Iprops) {
    return (
        <div className="bg-white shadow-lg rounded-lg py-12">
            <div className="flex items-center justify-center">
              
                <div>
                    <h1 className="text-3xl md:text-5xl fs-48 text-black font-bold">{title}</h1>
                       <div className="flex items-center justify-center gap-4 mt-8 flex-col md:flex-row">
                    <Button
                    className="bg-cyan-600 text-white font-bold py-6 px-8 rounded-lg hover:bg-cyan-700 transition-transform hover:scale-105 shadow-md w-full sm:w-auto"
                    variant="outline">{buttonReg}</Button>
                    <Button
                    className="bg-gray-200 text-gray-800 font-bold py-6 px-8 rounded-lg hover:bg-gray-300 transition-transform hover:scale-105 w-full sm:w-auto"
                    variant="outline">{buttonLog}</Button>
                </div>
                </div>
               
            </div>
        </div>
    );
}