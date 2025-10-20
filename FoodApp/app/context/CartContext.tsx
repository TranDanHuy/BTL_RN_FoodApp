import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Food } from "../services/foodService";

export type CartItem = {
  food: Food;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (food: Food, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  placeOrder: () => Promise<void>;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalPrice: 0,
  placeOrder: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (food: Food, quantity = 1) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.food.id === food.id);
      if (exist) {
        return prev.map((item) =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { food, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.food.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  // ✅ Lưu đơn hàng
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Giỏ hàng trống", "Hãy thêm món ăn trước khi đặt hàng!");
      return;
    }

    const order = {
      id: Date.now().toString(),
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString("vi-VN"),
    };

    try {
      const existing = await AsyncStorage.getItem("orders");
      const orders = existing ? JSON.parse(existing) : [];
      orders.push(order);
      await AsyncStorage.setItem("orders", JSON.stringify(orders));

      Alert.alert("🎉 Thành công", "Đơn hàng của bạn đã được đặt!");
      clearCart();
    } catch (e) {
      Alert.alert("Lỗi", "Không thể lưu đơn hàng!");
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
