// stores/useUserStore.ts
import { create } from "zustand";

export interface IUserStore {
  userEmail: string; // allow null before login
  userType?: "admin" | "importer" | "exporter" | string;
}

type UserStore = {
  user: IUserStore;
  setUser: (user: IUserStore) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: { userEmail: "", userType: "" },
  setUser: (user: IUserStore) => set({ user }),
  clearUser: () => {
    window.location.href = "/";
    set({
      user: { userEmail: "", userType: "" },
    });
    localStorage.removeItem("token");
  },
}));
