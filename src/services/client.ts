import { LoadingContextType } from "@/contexts/LoadingContext";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://fady-pc:8080";

interface FetchOptions extends RequestInit {
  body?: any;
  showLoading?: boolean;
  loadingMessage?: string;
  showError?: boolean;
  requiredToken?: boolean;
}
export interface IResponse<T = any> {
  success: boolean;
  error?: string;
  code?: number;
  payload?: T;
  serviceTime?: string;
}

let globalLoadingContext: LoadingContextType | null = null;

export const setGlobalLoadingContext = (context: LoadingContextType) => {
  globalLoadingContext = context;
};
export async function apiFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<IResponse<T>> {
  const {
    body,
    headers,
    requiredToken,
    showLoading = true,
    loadingMessage = 'جاري التحميل...',
    showError = true,
    ...rest
  } = options;

  // Show loading
  if (showLoading && globalLoadingContext) {
    globalLoadingContext.setLoadingMessage(loadingMessage);
    globalLoadingContext.setLoading(true);
  }

  try {
    const headerWithAuth = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
    const headerWithoutAuth = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    const isFormData = body instanceof FormData;
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...rest,
      headers: requiredToken ? {
        ...(!isFormData && {
          ...headerWithAuth,
        }),
        ...headers,
      } : {
        ...(!isFormData && {
          ...headerWithoutAuth,
        }),
        ...headers,
      },
      body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
      throw errorData;
    }

    const data = await res.json();

    // Hide loading on success
    if (showLoading && globalLoadingContext) {
      globalLoadingContext.setLoading(false);
    }

    return data as IResponse<T>;
  } catch (error: any) {
    // Hide loading on error
    if (showLoading && globalLoadingContext) {
      globalLoadingContext.setLoading(false);
    }

    // Show error toast
    if (showError && globalLoadingContext) {
      const errorMessage = error?.message || error?.error || "An error occurred";
      globalLoadingContext.setError(errorMessage);

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        if (globalLoadingContext) {
          globalLoadingContext.setError(null);
        }
      }, 5000);
    }

    throw error;
  }
}