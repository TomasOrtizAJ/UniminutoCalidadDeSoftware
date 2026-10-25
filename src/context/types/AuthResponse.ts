import { User } from "./Auth";

export interface AuthResponseError {
  body: {
    error: string;
  };
}
export interface IUserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
}
export interface AuthResponse {
  user: User;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface ILoginResponse {
  token: string;
}
export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;
}
