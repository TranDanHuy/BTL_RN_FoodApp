import Food from "../models/Food.js";

// ✅ Lấy danh sách món ăn
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách món ăn", error });
  }
};

// ✅ Thêm món ăn mới
export const addFood = async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).json({ message: "Thêm món ăn thành công!", food: newFood });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi thêm món ăn", error });
  }
};
