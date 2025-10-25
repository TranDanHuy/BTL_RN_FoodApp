import axios from "axios";

/**
 * ⚠️ Nếu bạn chạy bằng:
 * 👉 Android Emulator: dùng "http://10.0.2.2:4000/api"
 * 👉 Thiết bị thật (điện thoại): dùng "http://<IP máy thật>:4000/api"
 *    (IP này là địa chỉ hiển thị trong Expo: exp://192.168.x.x:8081)
 */

// 👇 GỢI Ý: thử lần lượt 2 dòng này (bật dòng phù hợp, tắt dòng còn lại)
const BASE_URL = "http://10.0.2.2:4000/api"; // ✅ Dành cho Android Emulator
// const BASE_URL = "http://192.168.1.116:4000/api"; // ✅ Dành cho điện thoại thật

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 giây phòng ngừa lỗi treo request
});

export default api;
