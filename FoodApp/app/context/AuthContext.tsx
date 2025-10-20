import React, { createContext, useState, ReactNode } from "react";
import usersDataRaw from "../data/users.json";

type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  active: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (fullName: string, email: string, password: string) => void;
  verifyAccount: (email: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  register: () => {},
  verifyAccount: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const usersData: User[] = usersDataRaw as User[];

  const login = async (email: string, password: string) => {
    const found = usersData.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      if (!found.active) {
        alert("Tài khoản chưa được kích hoạt, vui lòng xác minh email.");
        return false;
      }
      setUser(found);
      return true;
    } else {
      alert("Sai email hoặc mật khẩu.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = (fullName: string, email: string, password: string) => {
    const exist = usersData.find((u) => u.email === email);
    if (exist) {
      alert("Email đã tồn tại!");
      return;
    }
    const newUser: User = {
      id: (usersData.length + 1).toString(),
      fullName,
      email,
      password,
      role: "user",
      active: false,
    };
    usersData.push(newUser);
    alert("Đăng ký thành công, vui lòng xác minh email!");
  };

  const verifyAccount = (email: string) => {
    const userIndex = usersData.findIndex((u) => u.email === email);
    if (userIndex !== -1) {
      usersData[userIndex].active = true;
      alert("Tài khoản đã được xác minh thành công!");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, verifyAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
