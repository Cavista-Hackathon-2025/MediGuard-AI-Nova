"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email_address: string;
  phone_number: string | null;
  location: string;
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

  useEffect(() => {
    const initializeUser = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      console.log("🔍 Checking stored token & user:", { token, storedUser });

      if (!token || !storedUser) {
        console.warn("⚠ No token or user found, redirecting to login");
        setLoading(false);
        return;
      }

      try {
        const parsedUser: User = JSON.parse(storedUser);
        console.log("✅ Loaded user from localStorage:", parsedUser);

        if (!parsedUser.name || !parsedUser.email_address) {
          console.warn("⚠ Invalid user data in localStorage, clearing...");
          localStorage.removeItem("user");
          setUser(null);
        } else {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("❌ Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
      }

      setLoading(false);
    };

    initializeUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
