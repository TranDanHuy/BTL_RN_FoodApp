import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
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
  const STORAGE_KEY = "@foodapp_cart";

  // ✅ Khôi phục giỏ hàng khi mở app
  useEffect(() => {
    const loadCart = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setCartItems(JSON.parse(saved));
      } catch (e) {
        console.log("❌ Lỗi tải giỏ hàng:", e);
      }
    };
    loadCart();
  }, []);

  // ✅ Tự động lưu giỏ hàng khi thay đổi
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems)).catch((e) =>
      console.log("❌ Lỗi lưu giỏ hàng:", e)
    );
  }, [cartItems]);

  // ➕ Thêm món
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

  // ❌ Xóa 1 món
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.food.id !== id));
  };

  // 🧹 Xóa tất cả món
  const clearCart = async () => {
    setCartItems([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  // ✅ Đặt hàng (lưu vào lịch sử)
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
      // Lưu lịch sử đơn hàng
      const existing = await AsyncStorage.getItem("orders");
      const orders = existing ? JSON.parse(existing) : [];
      orders.push(order);
      await AsyncStorage.setItem("orders", JSON.stringify(orders));

      // Dọn giỏ hàng
      clearCart();
      Alert.alert("🎉 Thành công", "Đơn hàng của bạn đã được đặt!");
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
