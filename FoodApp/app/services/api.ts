import axios from "axios";

// ⚠️ Nếu bạn test bằng điện thoại thật hoặc giả lập Android, đổi localhost thành IP máy tính bạn (VD: 192.168.1.5)
// Ví dụ: const BASE_URL = "http://192.168.1.5:4000/api";
const BASE_URL = "http://192.168.1.101:4000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
