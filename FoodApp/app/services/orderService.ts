import AsyncStorage from "@react-native-async-storage/async-storage";
import { Food } from "./foodService";

type Order = {
  id: string;
  items: (Food & { quantity: number })[];
  total: number;
  date: string;
};

export const addOrder = async (items: (Food & { quantity: number })[]) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const newOrder: Order = {
    id: Date.now().toString(),
    items,
    total,
    date: new Date().toLocaleString("vi-VN"),
  };

  const existing = await AsyncStorage.getItem("orders");
  const orders = existing ? JSON.parse(existing) : [];
  orders.push(newOrder);

  await AsyncStorage.setItem("orders", JSON.stringify(orders));
};

export const getOrders = async (): Promise<Order[]> => {
  const data = await AsyncStorage.getItem("orders");
  return data ? JSON.parse(data) : [];
};
