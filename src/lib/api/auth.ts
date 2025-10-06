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
};
