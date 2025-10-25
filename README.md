# MÔ TẢ - HỆ THỐNG ĐẶT MÓN ĂN  FOODAPP

## THÔNG TIN CHUNG
- **Tên dự án**: Hệ thống đặt món ăn FoodApp
- **Số thành viên**: 3 người
- **Công nghệ**: 
  - Frontend: React Native, Chart, Axios, Navigation, AsyncStorage, Tailwind CSS
  - Backend: Node.js, Express, MongoDB, Mongoose, Nodemailer, Routes
  - Authentication: JWT
  - Real-time: WebSocket

## CẤU TRÚC DỰ ÁN

### Frontend Structure
```
FoodApp/
├── app/
│   ├── components/
│   ├── context/            # Xử lý lưu trữ và chia sẻ dữ liệu tài khoản và giỏ hàng
│   ├── data/
│   ├── hook/               
│   ├── navigantion/        # Phân luồng qua các màn hình
│   ├── screens/            # Các giao diện Admin, User,...
│   ├── services/           # Xử lý dữ liệu 
│   ├── styles/
│   ├── types/
│   ├── utils/

```

### Backend Structure
```
FoodApp_Backend/
├── config/                 # Xử lý test kết nối database
├── controllers/            # Xử lý nghiệp vụ dữ liệu
├── models/                 # Câu trúc dữ liệu entities
├── routes/                 # API enpoints
├── utils/                  # Xử lý, gửi mail xác minh cho người dùng
├── .env                    # Quản lý các biến môi trường
├── server.js               # Cấu hình và khởi chạy backend

```

**Lưu ý**: Mỗi thành viên cần đảm bảo code của mình integrate được với các module khác. Thường xuyên pull latest changes và test integration.
