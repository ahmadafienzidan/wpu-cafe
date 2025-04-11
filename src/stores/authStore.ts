import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
