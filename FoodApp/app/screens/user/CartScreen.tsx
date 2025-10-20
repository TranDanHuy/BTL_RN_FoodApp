import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { CartContext } from "../../context/CartContext";

const CartScreen = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Giỏ hàng của bạn</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>Số lượng: {item.quantity}</Text>
            <Text>Giá: {item.price * item.quantity} đ</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={{ color: "red" }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {cart.length > 0 && (
        <TouchableOpacity
          onPress={clearCart}
          style={{ backgroundColor: "#ef4444", padding: 10, borderRadius: 6 }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Xóa tất cả</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartScreen;
