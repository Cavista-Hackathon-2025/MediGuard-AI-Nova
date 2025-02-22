"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getUserProfile } from "../lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    const initializeUser = async () => {
      if (!token) {
        console.warn("⚠ No token found, redirecting to login");
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserProfile();
        console.log("✅ Retrieved user data:", userData);
        setUser(userData);
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [token]); // Dependency array includes `token` for reactivity

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ user, setUser, loading }), [user, loading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
