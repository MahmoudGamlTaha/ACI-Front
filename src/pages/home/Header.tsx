import { Users } from "lucide-react";
import HeaderCard from "./components/HeaderCard";

export default function Header() {
    return (
        <div>
            <h1>Header</h1>
            <div className="grid grid-cols-3 gap-2">

                <HeaderCard icon={<Users />} title="Users" num={10} />
                <HeaderCard icon={<Users />} title="Users01" num={10} />
                <HeaderCard icon={<Users />} title="Users02" num={15} />
            </div>
        </div>
    );
}