import api from "./api";

export type Food = {
  _id: string;
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

// Lấy danh sách món ăn
export const getFoods = async (): Promise<Food[]> => {
  try {
    const response = await api.get("/foods");
    console.log("Dữ liệu món ăn nhận được từ backend:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách món ăn:", error.message || error);
    return [];
  }
};

// Thêm món ăn mới
export const addFood = async (food: Partial<Food>) => {
  try {
    const response = await api.post("/foods", food);
    console.log("✔ Món ăn đã thêm:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi khi thêm món ăn:", error.message || error);
    throw error;
  }
};

// Cập nhật món ăn
export const updateFood = async (id: string, food: Partial<Food>) => {
  try {
    const response = await api.put(`/foods/${id}`, food);
    console.log("✔ Món ăn đã cập nhật:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi khi cập nhật món ăn:", error.message || error);
    throw error;
  }
};

// Xóa món ăn
export const deleteFood = async (id: string) => {
  try {
    const response = await api.delete(`/foods/${id}`);
    console.log("✔ Món ăn đã xóa:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi khi xóa món ăn:", error.message || error);
    throw error;
  }
};