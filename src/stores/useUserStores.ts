import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUserStore {
  userEmail: string | null;
  userType?: "admin" | "importer" | "exporter" | string;
  id?: number;
}

type UserStore = {
  user: IUserStore;
  setUser: (user: IUserStore) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        userEmail: null,
        userType: undefined,
      },
      setUser: (user) => set({ user }),
      clearUser: () => {
        localStorage.removeItem("token");
        set({
          user: { userEmail: null, userType: undefined },
        });
        window.location.href = "/";
      },
    }),
    {
      name: "user-store", // key in localStorage
    }
  )
);
