import api from "./api";

export type Food = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

// ✅ Lấy danh sách món ăn từ backend
export const getFoods = async (): Promise<Food[]> => {
  try {
    const response = await api.get("/foods");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách món ăn:", error);
    return [];
  }
};
