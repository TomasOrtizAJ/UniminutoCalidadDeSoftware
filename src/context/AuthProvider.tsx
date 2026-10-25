/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, createContext, useState, useEffect } from "react";
import { User } from "./types/Auth";
import { BASE_URL } from "../modules/environments/utils/Constants";
import { AccessTokenResponse, AuthResponse } from "./types/AuthResponse";

const API_BASE = BASE_URL;
interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => {},
  getUser: () => ({} as User | undefined),
  signOut: () => {},
});
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccesToken] = useState<string>("");
  const [user, setUser] = useState<User>();
  function getAccessToken() {
    return accessToken;
  }
  function saveUser(userData: AuthResponse) {
    saveSessionInfo(
      userData.user,
      userData.token.accessToken,
      userData.token.refreshToken
    );
  }
  useEffect(() => {
    checkAuth();
  }, []);
  async function requestNewAccessToken(refreshToken: string) {
    try {
      const response = await fetch(`${API_BASE}Authentication/RefreshToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (response.ok) {
        const json = (await response.json()) as AccessTokenResponse;

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async function getUserInfo(accessToken: string) {
    try {
      const response = await fetch(`${API_BASE}user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async function checkAuth() {
    if (accessToken) {
      setIsAuthenticated(true);
      return;
    } else {
      const token = getRefreshToken();
      if (token) {
        const newAccessToken = await requestNewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionInfo(userInfo, newAccessToken, token);
          }
        }
      }
    }
  }
  function signOut() {
    setIsAuthenticated(false);
    setAccesToken("");
    setUser(undefined);
    localStorage.removeItem("token");
  }
  function saveSessionInfo(
    userInfo: User,
    accessToken: string,
    refreshToken: string
  ) {
    setAccesToken(accessToken);
    localStorage.setItem("token", JSON.stringify({ token: refreshToken }));
    setIsAuthenticated(true);
    setUser(userInfo);
  }
  function getRefreshToken(): string | null {
    const tokenData = localStorage.getItem("token");
    return tokenData ? JSON.parse(tokenData) : null;
  }
  function getUser() {
    return user;
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        saveUser,
        getRefreshToken,
        getUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
