import foodsData from "../data/foods.json";

export type Food = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
};

export const getFoods = async (): Promise<Food[]> => {
  return foodsData;
};
