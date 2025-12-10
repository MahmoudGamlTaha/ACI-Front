import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Languages, Moon, Sun } from "lucide-react";
import Logo from '../../../public/images/logo.png'

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [showLangMenu, setShowLangMenu] = useState(false);

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

    return (
        <header className="shadow-md sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-22 items-center justify-between px-4">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <img src={Logo} alt="Logo" width={150} />
                </div>

                {/* Right Section - Language & Sign In */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="default">
                        {t('header.commercialGate') || 'Commercial Gate'}
                    </Button>
                    {/* Sign In Button */}
                    <Button variant="default" size="default">
                        {t('header.signIn') || 'Sign In'}
                    </Button>
                    <Button variant="ghost" size="default">
                        {t('header.signUp') || 'Sign Up'}
                    </Button>
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
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon-lg"
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="relative"
                        >
                            <Languages className="size-6" />
                            <span className="sr-only">Change language</span>
                        </Button>

                        {/* Language Dropdown */}
                        {showLangMenu && (
                            <div className="absolute right-0 mt-2 w-40 rounded-lg border border-border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95">
                                <div className="p-1">
                                    <button
                                        onClick={() => changeLanguage('en')}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${i18n.language === 'en' ? 'bg-accent text-accent-foreground' : ''
                                            }`}
                                    >
                                        🇺🇸 English
                                    </button>
                                    <button
                                        onClick={() => changeLanguage('ar')}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${i18n.language === 'ar' ? 'bg-accent text-accent-foreground' : ''
                                            }`}
                                    >
                                        🇸🇦 العربية
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </header>
    );
};

export default Header;