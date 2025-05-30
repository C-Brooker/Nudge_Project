import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { getProfile } from "@/apis/auth";
import { useProfileStore } from "@/stores/useProfileStore";

interface Auth {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  hydrated: boolean;

  initialise: () => Promise<void>;
  setTokens: (access: string, refresh: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  getAccessToken: () => Promise<string>;
  getRefreshToken: () => Promise<string>;
}

export const useAuthStore = create<Auth>()(
  persist<
    Auth,
    [],
    [],
    { accessToken: string | null; refreshToken: string | null }
  >(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      hydrated: false,

      //Reads token - loaded by middleware and tries to load profile
      initialise: async () => {
        const { accessToken, refreshToken } = get();

        if (accessToken && refreshToken) {
          try {
            const profile = await getProfile();
            useProfileStore.getState().setProfile(profile);
          } catch {
            await get().clearAuth();
          }
        }
        set({ hydrated: true });
      },

      //Stores token and updates state
      setTokens: async (access, refresh) => {
        await Promise.all([
          SecureStore.setItemAsync("accessToken", access),
          SecureStore.setItemAsync("refreshToken", refresh),
        ]);
        set({ accessToken: access, refreshToken: refresh, isLoggedIn: true });
      },

      //Removes tokens and updates state
      clearAuth: async () => {
        await Promise.all([
          SecureStore.deleteItemAsync("accessToken"),
          SecureStore.deleteItemAsync("refreshToken"),
        ]);
        set({ accessToken: null, refreshToken: null, isLoggedIn: false });
      },

      /** Fallback to SecureStore if state hasn’t been hydrated yet */
      getAccessToken: async () => {
        const token =
          get().accessToken ?? (await SecureStore.getItemAsync("accessToken"));
        if (!token) throw new Error("NO Access Token");
        return token;
      },

      getRefreshToken: async () => {
        const token =
          get().refreshToken ??
          (await SecureStore.getItemAsync("refreshToken"));
        if (!token) throw new Error("NO Refresh Token");
        return token;
      },
    }),

    //Middleware config
    {
      name: "auth-storage",
      storage: {
        getItem: async (key) => {
          const value = await SecureStore.getItemAsync(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (_key, value) =>
          SecureStore.setItemAsync(_key, JSON.stringify(value)),
        removeItem: SecureStore.deleteItemAsync,
      },

      /* Save access token hydration */
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      /* After rehydration start profile check */
      onRehydrateStorage: () => (state) => {
        state?.initialise?.();
      },
    }
  )
);
