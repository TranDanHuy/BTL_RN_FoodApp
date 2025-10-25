import React, { createContext, useState, ReactNode } from "react";
import { Alert } from "react-native";
import { loginUser, registerUser } from "../services/userService";

type User = {
  _id: string;
  customId: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  active: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  verifyAccount: (email: string) => Promise<boolean>;
  checkVerification: (email: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  verifyAccount: async () => false,
  checkVerification: async () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      if (data && data.user) {
        setUser({
          _id: data.user.id,
          customId: data.user.customId,
          fullName: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
          active: data.user.active,
        });
        Alert.alert("Thành công", data.message || "Đăng nhập thành công!");
        return true;
      } else {
        Alert.alert("Thất bại", "Không nhận được phản hồi hợp lệ từ server!");
        return false;
      }
    } catch (error: any) {
      console.log("Lỗi đăng nhập:", error.response?.data || error.message);
      Alert.alert("Lỗi", "Sai email hoặc mật khẩu!");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    Alert.alert("Đã đăng xuất");
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    try {
      const data = await registerUser(fullName, email, password);
      if (data.success === true) {
        Alert.alert("Thành công", data.message || "Đăng ký thành công!");
        return true;
      } else {
        Alert.alert("Thất bại", "Đăng ký không thành công!");
        return false;
      }
    } catch (error: any) {
      console.log("Lỗi đăng ký:", error.response?.data || error.message);
      Alert.alert("Lỗi", error.response?.data?.message || "Không thể đăng ký, vui lòng thử lại!");
      return false;
    }
  };

  const verifyAccount = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch("http://10.0.2.2:4000/api/users/verify?email=" + email);
      const data = await res.json();

      if (res.ok && data.success) {
        Alert.alert("Xác minh thành công", data.message || "Tài khoản đã được xác minh!");
        return true;
      } else {
        Alert.alert("Xác minh thất bại", data.message || "Không thể xác minh tài khoản!");
        return false;
      }
    } catch (error: any) {
      console.log("Lỗi xác minh:", error.message);
      Alert.alert("Lỗi", "Không thể xác minh tài khoản!");
      return false;
    }
  };

  const checkVerification = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch(`http://10.0.2.2:4000/api/users/status?email=${email}`);
      const data = await res.json();
      return data.active === true;
    } catch (error) {
  const err = error as Error;
  console.log("Lỗi:", err.message);
  return false;
}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, verifyAccount, checkVerification }}>
      {children}
    </AuthContext.Provider>
  );
};