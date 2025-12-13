import { api } from "./api";

interface LoginResponse {
  message: string;
  token: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const res = await api.post("/users/login", { email, password });
  return res.data;
}
