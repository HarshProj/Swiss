import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  name: string;
  bio: string;
  profilePic: string;
  uploadedMemes: string[];
  likedMemes: string[];
}

interface UserContextType {
  user: User;
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
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || JSON.stringify(defaultUser));
    }
    return defaultUser;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const updateUser = (updates: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...updates }));
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
