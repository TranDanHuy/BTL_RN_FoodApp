import Food from "../models/Food.js";

// ✅ Hàm sinh id tự động tăng dần (dạng "000001", "000002", ...)
const generateFoodId = async () => {
  const foods = await Food.find({}, { id: 1 }).lean();
  const usedIds = new Set(
    foods
      .map((f) => Number(f.id))
      .filter((n) => !isNaN(n)) // loại bỏ id không hợp lệ
  );

  let nextId = 1;
  while (usedIds.has(nextId)) {
    nextId++;
  }

  return nextId.toString().padStart(6, "0");
};

// ✅ Lấy danh sách món ăn
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách món ăn", error });
  }
};

// ✅ Thêm món ăn mới (có sinh id nếu thiếu)
export const addFood = async (req, res) => {
  try {
    const foodData = { ...req.body };

    // Nếu không có id hoặc id rỗng → tự sinh
    if (!foodData.id || foodData.id.trim() === "") {
      foodData.id = await generateFoodId();
    }

    const newFood = new Food(foodData);
    await newFood.save();

    res.status(201).json({ message: "Thêm món ăn thành công!", food: newFood });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi thêm món ăn", error });
  }
};

export const deleteFood = async (req, res) => {
  try {
    let food = await Food.findOneAndDelete({ id: req.params.id });

    if (!food) {
      food = await Food.findByIdAndDelete(req.params.id);
    }

    if (!food) {
      return res.status(404).json({ message: "Không tìm thấy món ăn để xóa" });
    }

    res.status(200).json({ message: "Đã xóa món ăn thành công", food });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa món ăn", error });
  }
};