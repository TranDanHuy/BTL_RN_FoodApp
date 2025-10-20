export const getImage = (name: string) => {
  try {
    switch (name) {
      case "TraSua":
        return require("../../assets/images/TraSua.png");
      case "Pizza":
        return require("../../assets/images/Pizza.png");
      case "Burger":
        return require("../../assets/images/Burger.png");
      case "Sushi":
        return require("../../assets/images/Sushi.png");
      case "Salad":
        return require("../../assets/images/Salad.png");
      default:
        // Nếu không có ảnh, tạm dùng Trà Sữa làm ảnh mặc định
        return require("../../assets/images/TraSua.png");
    }
  } catch (error) {
    console.warn("Ảnh không tồn tại:", name);
    return require("../../assets/images/TraSua.png");
  }
};
