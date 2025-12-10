import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
    return (
        <div>
            <Header />
            <main className="bg-gray-100 min-h-screen">
                Hello
            </main>
            <Footer />
        </div>
    );
}