import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStores";

export default function PrivateLayout() {
    const { setUser } = useUserStore();

    //     useEffect(() => {
    //     const storedUser = localStorage.getItem("user");

    //     if (!storedUser) return;

    //     const parsedUser = JSON.parse(storedUser);

    //     if (parsedUser?.userEmail) {
    //         setUser(parsedUser);
    //     }
    // }, []);

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