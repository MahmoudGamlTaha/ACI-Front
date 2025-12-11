import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
    return (
        <div>
            <Header />
            <main className="bg-gray-100 min-h-screen p-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}