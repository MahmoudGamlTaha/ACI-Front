import { useLoading } from "@/contexts/LoadingContext";
import { apiFetch, setGlobalLoadingContext } from "@/services/client";
import { useEffect } from "react";

export const useApi = () => {
    const loadingContext = useLoading();

    useEffect(() => {
        setGlobalLoadingContext(loadingContext);
    }, [loadingContext]);

    return { apiFetch };
};