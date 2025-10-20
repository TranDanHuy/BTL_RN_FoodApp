import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../../context/CartContext";

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍 Giỏ hàng của bạn</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Giỏ hàng trống</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.food.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.food.name}</Text>
                  <Text>Số lượng: {item.quantity}</Text>
                  <Text>
                    Giá: {(item.food.price * item.quantity).toLocaleString()} đ
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFromCart(item.food.id)}
                >
                  <Text style={{ color: "#fff" }}>Xóa</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.total}>Tổng cộng: {totalPrice.toLocaleString()} đ</Text>

          <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Xóa tất cả</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "#ff6600", marginBottom: 10 },
  empty: { textAlign: "center", color: "#999", marginTop: 50 },
  item: {
    backgroundColor: "#fff3e6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  name: { fontSize: 16, fontWeight: "bold" },
  removeBtn: {
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
    color: "#ff6600",
  },
  clearBtn: {
    backgroundColor: "#ff3333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default CartScreen;
