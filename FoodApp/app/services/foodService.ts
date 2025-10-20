import foodsData from "../data/foods.json";

export type Food = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

// giả lập dữ liệu
let foods: Food[] = [...(foodsData as Food[])];

// lấy danh sách
export const getFoods = async (): Promise<Food[]> => {
  return foods;
};

// thêm món
export const addFood = async (newFood: Omit<Food, "id">): Promise<void> => {
  const id = (foods.length + 1).toString();
  foods.push({ id, ...newFood });
};

// cập nhật món
export const updateFood = async (id: string, updated: Partial<Food>): Promise<void> => {
  foods = foods.map((f) => (f.id === id ? { ...f, ...updated } : f));
};

// xóa món
export const deleteFood = async (id: string): Promise<void> => {
  foods = foods.filter((f) => f.id !== id);
};
