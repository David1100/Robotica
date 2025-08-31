import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  token: string;
};

type AuthStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      login: (user: User) => {
        set({ user });
      },

      logout: () => {
        set({ user: null });
      },

      isAuthenticated: () => {
        return get().user !== null;
      },
    }),
    {
      name: "auth-storage", // clave en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
