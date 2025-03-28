import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Administrador",
    isAdmin: true,
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Usuário Padrão",
    isAdmin: false,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const getUsersFromStorage = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : MOCK_USERS;
  };

  const saveUsersToStorage = (users: typeof MOCK_USERS) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast.success("Login realizado com sucesso!");
      setIsLoading(false);
      return true;
    }

    toast.error("Email ou senha inválidos");
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    let users = getUsersFromStorage();

    if (users.some(u => u.email === email)) {
      toast.error("Email já cadastrado!");
      setIsLoading(false);
      return false;
    }

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      password,
      name,
      isAdmin: false,
    };

    users = [...users, newUser];
    saveUsersToStorage(users);

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));

    toast.success("Conta criada com sucesso!");
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Você saiu da conta.");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
