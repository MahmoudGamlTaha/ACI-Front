import { UserRegistration } from "@/models/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type UserStore = {
  user: UserRegistration;
  setUser: (user: UserRegistration) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {} as UserRegistration,
      setUser: (user) => set({ user }),
      clearUser: () => {
        localStorage.removeItem("token");
        set({
          user: {} as UserRegistration,
        });
        window.location.href = "/";
      },
    }),
    {
      name: "user-store", // key in localStorage
    }
  )
);
