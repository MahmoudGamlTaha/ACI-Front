import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Languages, LogOut, Moon, Sun } from "lucide-react";
import Logo from '../../../public/images/logo.png'
import { ThemeContext } from "@/contexts/ThemeContext";
import { useUserStore } from "@/stores/useUserStores";
import NotificationMenu from "./NotificationMenu";

const Header: React.FC = () => {
    const { user, clearUser } = useUserStore();
    const { t, i18n } = useTranslation();
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [showNotificationMenu, setShowNotificationMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);


    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
        document.documentElement.lang = lng;
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
        setShowLangMenu(false);
    };

    useEffect(() => {
        const storedLng = localStorage.getItem('i18nextLng');
        if (storedLng) {
            i18n.changeLanguage(storedLng);
            document.documentElement.lang = storedLng;
            document.documentElement.dir = storedLng === 'ar' ? 'rtl' : 'ltr';
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            // Close language menu if clicked outside
            if (
                menuRef.current &&
                !menuRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setShowLangMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="dark:bg-card shadow-md sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-22 items-center justify-between px-4">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <img className="dark:invert" src={Logo} alt="Logo" width={150} />
                </div>

                {/* Right Section - Notifications, User Info, Dark Mode, Language & Logout */}
                <div className="flex items-center gap-2">
                    {/* Notification Menu Component */}
                    <NotificationMenu
                        open={showNotificationMenu}
                        onOpenChange={setShowNotificationMenu}
                    />

                    {/* User Welcome */}
                    <p className="grow me-2 font-bold text-foreground">
                        {t('header.welcome')}
                        <span className="ms-2 text-foreground text-sm font-normal">{user?.userEmail || "user"}</span>
                    </p>

                    {/* Dark Mode Toggle */}
                    <Button
                        variant="ghost"
                        size="icon-lg"
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? (
                            <Moon className="size-6" />
                        ) : (
                            <Sun className="size-6" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {/* Language Selector */}
                    <div className="relative flex gap-2">
                        <Button
                            ref={buttonRef}
                            variant="ghost"
                            size="icon-lg"
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="relative"
                        >
                            <Languages className="size-6" />
                            <span className="sr-only">Change language</span>
                        </Button>

                        {showLangMenu && (
                            <div
                                ref={menuRef}
                                className="absolute right-0 mt-2 w-40 rounded-lg border border-border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95"
                            >
                                <div className="p-1">
                                    <button
                                        onClick={() => changeLanguage("en")}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${i18n.language === "en"
                                            ? "bg-accent text-accent-foreground"
                                            : ""
                                            }`}
                                    >
                                        🇺🇸 English
                                    </button>

                                    <button
                                        onClick={() => changeLanguage("ar")}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${i18n.language === "ar"
                                            ? "bg-accent text-accent-foreground"
                                            : ""
                                            }`}
                                    >
                                        🇸🇦 العربية
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Logout Button */}
                        <Button variant="destructive" size="default"
                            onClick={clearUser}>
                            {t('header.logOut')}
                            <LogOut className="ms-2 size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;