import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";
import { getTokenDecoded } from "@/lib/getToken";
import { useUserStore } from "@/stores/useUserStores";

export default function PrivateLayout() {
    const { setUser } = useUserStore();

    useEffect(() => {
        const decodedToken = getTokenDecoded();
        if (decodedToken) {
            console.log(decodedToken);
            setUser({ userEmail: decodedToken?.sub || "", userType: decodedToken?.user_type as string });
        }
    }, []);

    return (
        <div>
            <Header />
            <main className="bg-gray-100 p-2 px-32 h-[calc(100vh-9rem)] overflow-y-auto dark:bg-accent">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}