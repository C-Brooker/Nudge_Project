import * as SecureStore from "expo-secure-store";

interface Token {
  accessToken: string;
  refreshToken: string;
}

export async function storeTokens(tokens: Token) {
  await SecureStore.setItemAsync("accessToken", tokens.accessToken);
  await SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
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
