import GlobalLoader from "@/components/GlobalLoader";
import { createContext, ReactNode, useContext, useState } from "react";

export interface LoadingContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    loadingMessage: string;
    setLoadingMessage: (message: string) => void;
    error: string | null;
    setError: (error: string | null) => void;
}
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
};

interface LoadingProviderProps {
    children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading...');
    const [error, setError] = useState<string | null>(null);

    const setLoading = (loading: boolean) => {
        setIsLoading(loading);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading, loadingMessage, setLoadingMessage, error, setError }}>
            {children}
            {isLoading && <GlobalLoader message={loadingMessage} />}
        </LoadingContext.Provider>
    );
};
