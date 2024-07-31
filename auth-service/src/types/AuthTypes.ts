export interface AuthRequest {
  email: string;
  password: string;
  token?: string;
}

export interface AuthResponse {
  status: "success" | "failed";
  token: string;
  message: string;
  data: {
    name: string;
    email: string;
  };
  error: string;
}
