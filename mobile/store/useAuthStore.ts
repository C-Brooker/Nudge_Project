import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setTokens: (access: string, refresh: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  setTokens: (access, refresh) =>
    set({ accessToken: access, refreshToken: refresh, isLoggedIn: true }),
  clearAuth: () =>
    set({ accessToken: null, refreshToken: null, isLoggedIn: false }),
}));
