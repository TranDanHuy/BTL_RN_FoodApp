import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";

export const registerUser = async (name: string, email: string, password: string, role = "user") => {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/register`, {
      name,
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

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
    return res.data;
  } catch (error: any) {
    console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
    throw error;
  }
};
