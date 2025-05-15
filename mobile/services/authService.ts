import { getProfile } from "@/apis";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";
import { router, SplashScreen } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function storeTokens({ accessToken, refreshToken }: Tokens) {
  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
}

export async function getAccessToken(): Promise<string> {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    return token;
  }
  throw new Error("NO Access Token");
}

export async function getRefreshToken(): Promise<string> {
  const token = await SecureStore.getItemAsync("refreshToken");

  if (token) {
    return token;
  }
  throw new Error("No Refresh Token");
}

export async function clearTokens(): Promise<void> {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
}

async function initialiseAuth() {
  try {
    const [accessToken, refreshToken] = await Promise.all([
      SecureStore.getItemAsync("accessToken"),
      SecureStore.getItemAsync("refreshToken"),
    ]);
    if (accessToken && refreshToken) {
      useAuthStore.getState().setTokens(accessToken, refreshToken);
    }
    try {
      const profile = await getProfile();
      useProfileStore.getState().setProfile(profile);
    } catch (err) {
      await clearTokens();
      useAuthStore.getState().clearAuth();
    }
  } catch {
    //User not logged in
  }
}

export default function AppInit({ children }: any) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    initialiseAuth()
      .catch(console.warn)
      .finally(async () => {
        setReady(true);
        await SplashScreen.hideAsync();
      });
  }, []);

  if (!ready) return null;

  return children;
}
