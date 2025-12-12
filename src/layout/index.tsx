import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
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