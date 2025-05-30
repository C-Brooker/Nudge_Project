import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useAchievementStore } from "@/stores/useAchievementStore";
import { useRouter } from "expo-router";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  username: string;
  password: string;
}

//Creating User and Creating their Profile
export const registerUser = async (data: RegisterData) => {
  const { confirmPassword, ...payload } = data;
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + "/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) throw new Error("Failed to register");

    const result = await response.json();
    console.log("Registration Successful:", result);
  } catch (error: any) {
    console.log("Error during submission", error.message);
  }
};

//Authenticating user and retrieving their Profile
export const loginUser = async (data: LoginData) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_APP_URL + "/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorMsg = response.text();
    throw new Error("Failed to Login: " + errorMsg);
  }

  const { accessToken, refreshToken } = await response.json();

  //Persisting tokens in async - Permanent
  await useAuthStore.getState().setTokens(accessToken, refreshToken);

  const profile = await getProfile();
  useProfileStore.getState().setProfile(profile);
  useRouter().navigate("/(app)/(tabs)/habits");
};

export const getProfile = async () => {
  const token = useAuthStore.getState().accessToken;

  const response = await fetch(
    process.env.EXPO_PUBLIC_APP_URL + "/profiles/user",
    {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch profile");

  return response.json();
};

export const logoutUser = async () => {
  useAuthStore.getState().clearAuth();
  useProfileStore.getState().clearProfile();
  useAchievementStore.getState().clearAchievements();
  useRouter().navigate("/(guest)/(tabs)/habits");
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + "/auth/logout",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) throw new Error("Failed to Logout");

    await useAuthStore.getState().clearAuth();
    useProfileStore.getState().clearProfile();
  } catch (error) {
    throw error;
  }
};
