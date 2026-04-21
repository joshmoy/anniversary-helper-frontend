import { BackendLoginResponse, LoginResponse } from "@/types";
import { apiWithoutAuth } from "./api";

export const authClient = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiWithoutAuth.post<BackendLoginResponse>("/auth/login", {
      email,
      password,
    });
    const data = response.data;

    return {
      token: data.access_token,
      user: {
        id: 1,
        username: data.user.username,
        email: data.user.email,
        full_name: data.user.full_name,
        account_type: data.user.account_type,
        role: data.user.role,
        is_active: data.user.is_active,
      },
    };
  },

  async register(
    fullName: string,
    username: string,
    email: string,
    password: string,
    accountType: string
  ): Promise<LoginResponse> {
    const response = await apiWithoutAuth.post<BackendLoginResponse>("/auth/register", {
      full_name: fullName,
      username,
      email,
      password,
      account_type: accountType,
    });
    const data = response.data;

    return {
      token: data.access_token,
      user: {
        id: 1,
        username: data.user.username,
        email: data.user.email,
        full_name: data.user.full_name,
        account_type: data.user.account_type,
        role: data.user.role,
        is_active: data.user.is_active,
      },
    };
  },
};
