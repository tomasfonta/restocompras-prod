import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/User";

interface UserContextType {
  currentUser: User | null;
  login: (email: string, role: UserType) => boolean;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  users: User[];
  addUser: (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Sample users for demo
const sampleUsers: User[] = [
  {
    id: "user-1",
    companyName: "Restaurante El Buen Sabor",
    address: "Av. Corrientes 1234, Buenos Aires",
    phone: "+54 11 4567-8900",
    email: "restaurante@email.com",
    password: "password123",
    userType: "restaurant",
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
  },
  {
    id: "user-2",
    companyName: "Lácteos del Valle",
    address: "Ruta 9 Km 45, Córdoba",
    phone: "+54 351 123-4567",
    email: "proveedor@email.com",
    password: "password123",
    userType: "supplier",
    createdAt: "2024-06-01T11:00:00Z",
    updatedAt: "2024-06-01T11:00:00Z",
  },
];

export type UserType = "restaurant" | "supplier";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(sampleUsers);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, role: UserType): boolean => {
    // TODO: store the email the user entered. Ideally send mail.
    const user = users.find((u) => u.userType === role);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const updateUser = (userData: Partial<User>) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ...userData,
        updatedAt: new Date().toISOString(),
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Update in users array
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? updatedUser : u))
      );
    }
  };

  const addUser = (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
        updateUser,
        users,
        addUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
