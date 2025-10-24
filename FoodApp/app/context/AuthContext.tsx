import React, { createContext, useState, ReactNode } from "react";
import { Alert } from "react-native";
import { loginUser, registerUser } from "../services/userService";

type User = {
  _id: string; // ✅ Đổi từ id → _id để khớp với MongoDB
  name: string;
  email: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (fullName: string, email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  register: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 🟢 Đăng nhập (API thật)
  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      if (data && data.user) {
        // ✅ Giả sử backend trả về user._id, nên dùng _id thay vì id
        setUser({
          _id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        });
        Alert.alert("🎉 Thành công", data.message || "Đăng nhập thành công!");
        return true;
      } else {
        Alert.alert("❌ Thất bại", "Không nhận được phản hồi hợp lệ từ server!");
        return false;
      }
    } catch (error: any) {
      console.log("❌ Lỗi đăng nhập:", error.response?.data || error.message);
      Alert.alert("Lỗi", "Sai email hoặc mật khẩu!");
      return false;
    }
  };

  // 🟢 Đăng xuất
  const logout = () => {
    setUser(null);
    Alert.alert("Đã đăng xuất");
  };

  // 🟢 Đăng ký
  const register = async (fullName: string, email: string, password: string) => {
    try {
      const data = await registerUser(fullName, email, password);
      Alert.alert("🎉 Thành công", data.message || "Đăng ký thành công!");
    } catch (error: any) {
      console.log("❌ Lỗi đăng ký:", error.response?.data || error.message);
      Alert.alert("Lỗi", "Không thể đăng ký, vui lòng thử lại!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
