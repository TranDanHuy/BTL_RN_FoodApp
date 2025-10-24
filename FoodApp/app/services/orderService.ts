import api from "./api";

// 🧾 Gửi đơn hàng lên backend MongoDB
export const createOrder = async (orderData: any) => {
  try {
    const res = await api.post("/orders", orderData);
    return res.data;
  } catch (err) {
    console.error("❌ Lỗi khi tạo đơn hàng:", err);
    throw err;
  }
};

// 📦 Lấy danh sách đơn hàng (nếu cần dùng ở OrderScreen)
export const getOrders = async () => {
  try {
    const res = await api.get("/orders");
    return res.data;
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách đơn hàng:", err);
    return [];
  }
};
