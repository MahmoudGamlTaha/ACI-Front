import React, { useMemo } from "react";
import { useUserStore } from "@/stores/useUserStores";
import { getToken } from "@/lib/getToken";
import AccessDenied from "@/components/AccessDenied";

interface IprotectedRoutesProps {
  children: React.ReactNode;
  byType?: string[];
}

export default function ProtectedRoute({
  children,
  byType,
}: IprotectedRoutesProps) {
  const { user: userStore } = useUserStore();
  const token = getToken();
  const userType = userStore?.userType;

  const isAuthenticated = useMemo((): boolean => {
    if (!token) return false;

    // If no specific types are required, just being logged in is enough
    if (!byType || byType.length === 0) {
      return true;
    }

    // Check if user's type matches any of the allowed types
    if (userType && byType.includes(userType)) {
      return true;
    }

    return false;
  }, [token, byType, userType]);

  // If token exists but user info isn't loaded yet
  if (token && !userType) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}