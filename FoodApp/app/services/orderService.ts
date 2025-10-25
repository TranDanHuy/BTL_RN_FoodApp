import api from "./api";

export type Order = {
  _id: string;
  id: string;
  customerName: string;
  items: {
    foodId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  createdAt: string;
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get("/orders");
    console.log("Dữ liệu đơn hàng:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy đơn hàng:", error.message || error);
    return [];
  }
};

export type OrderPayload = {
  userId: string;
  items: {
    food: any;
    quantity: number;
  }[];
  total: number;
  date: string;
};

export const createOrder = async (order: OrderPayload) => {
  try {
    const response = await api.post("/orders", order);
    console.log("Đơn hàng đã tạo:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi tạo đơn hàng:", error.message || error);
    throw error;
  }
};