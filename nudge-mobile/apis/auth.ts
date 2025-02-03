import { date } from "zod";
import * as Token from "../services/authService";

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

export const loginUser = async (data: LoginData) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + "/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to Login");

    const result = await response.json();

    Token.storeTokens(result);

    console.log("AT:" + (await Token.getAccessToken()));
    console.log("RT:" + (await Token.getRefreshToken()));
    //console.log("User Logged In" + result);
  } catch (error: any) {
    throw error;
  }
};

export const logoutUser = async () => {
  const refreshToken = await Token.getRefreshToken();

  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + "/auth/logout",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(refreshToken),
      }
    );

    if (!response.ok) throw new Error("Failed to Logout");

    const result = response.json();

    Token.clearTokens();

    return result;
  } catch (error) {
    throw error;
  }
};
