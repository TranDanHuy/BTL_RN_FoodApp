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

    // 👉 Thêm log này để kiểm tra xem dữ liệu có về frontend chưa
    console.log("✅ Dữ liệu món ăn nhận được từ backend:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi khi lấy danh sách món ăn:", error.message || error);
    return [];
  }
};
