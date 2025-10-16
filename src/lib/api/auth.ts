import { BackendLoginResponse, LoginResponse } from "@/types";
import { apiWithoutAuth } from "./api";

export const authClient = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await apiWithoutAuth.post<BackendLoginResponse>("/auth/login", {
      username,
      password,
    });
    const data = response.data;

    // Transform backend response to match frontend expectations
    return {
      token: data.access_token,
      user: {
        id: 1, // Backend doesn't provide ID, using default
        username: data.admin.username,
      },
    };
  },

  async register(
    fullName: string,
    email: string,
    password: string,
    accountType: string
  ): Promise<LoginResponse> {
    // TODO: Update this endpoint when backend registration is implemented
    const response = await apiWithoutAuth.post<BackendLoginResponse>("/auth/register", {
      full_name: fullName,
      email,
      password,
      account_type: accountType,
    });
    const data = response.data;

    // Transform backend response to match frontend expectations
    return {
      token: data.access_token,
      user: {
        id: 1,
        username: data.admin.username,
        email,
      },
    };
  },
};
