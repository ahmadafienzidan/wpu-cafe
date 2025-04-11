import { fetchAPI } from "../utils/fetch";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const AuthService = {
  login: (payload: LoginPayload) =>
    fetchAPI<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
