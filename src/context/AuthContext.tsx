"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { AuthPayload } from "@/lib/types";
import { COOKIE_NAME } from "@/lib/constants";

interface AuthContextType {
  user: AuthPayload | null;
  loading: boolean;
  login: (token: string, user: AuthPayload) => void;
  logout: () => void;
  isAdmin: boolean;
  isStudent: boolean;
  isTeacher: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.split("; ").find((r) => r.startsWith(`${COOKIE_NAME}=`));
    if (token) {
      fetch("/api/auth/me", { credentials: "include" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.user) setUser(data.user);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback((token: string, userData: AuthPayload) => {
    document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
    setUser(null);
    window.location.href = "/";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isStudent: user?.role === "student",
        isTeacher: user?.role === "teacher",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
