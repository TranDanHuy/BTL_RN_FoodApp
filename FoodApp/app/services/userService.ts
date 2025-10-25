import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";
import api from "./api";


export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users");
    console.log("Dữ liệu người dùng:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy người dùng:", error.message || error);
    return [];
  }
};


// 📌 Đăng ký
export const registerUser = async (
  fullName: string,
  email: string,
  password: string,
  role = "user"
) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/register`, {
      fullName,
      email,
      password,
      role,
    });
    return res.data;
  } catch (error: any) {
    console.error("❌ Lỗi đăng ký:", error.response?.data || error.message);
    throw error;
  }
};

// 📌 Đăng nhập
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error: any) {
    console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
    throw error;
  }
};