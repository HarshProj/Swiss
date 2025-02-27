import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  name: string;
  bio: string;
  profilePic: string;
  uploadedMemes: string[];
  likedMemes: string[];
}

interface UserContextType {
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
}

const defaultUser: User = {
  name: "Meme Lover",
  bio: "I love memes! 😂",
  profilePic: "/default-avatar.png",
  uploadedMemes: [],
  likedMemes: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Initially null to avoid SSR mismatch

  useEffect(() => {
    // ✅ Load user from localStorage after mounting
    const storedUser = JSON.parse(localStorage.getItem("user") || "null") || defaultUser;
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (updates: Partial<User>) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...updates } : defaultUser));
  };

  if (user === null) {
    return null; // 🚀 Prevent rendering until user is loaded
  }

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
