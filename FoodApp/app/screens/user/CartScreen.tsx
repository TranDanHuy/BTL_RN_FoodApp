import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CartContext } from "../../context/CartContext";

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice, placeOrder } =
    useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Giỏ hàng của bạn</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Giỏ hàng trống!</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) =>
              item.food._id?.toString() || Math.random().toString()
            }
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.food.name}</Text>
                  <Text style={styles.detail}>
                    {item.quantity} x {item.food.price.toLocaleString()} đ
                  </Text>
                  <Text style={styles.totalLine}>
                    = {(item.food.price * item.quantity).toLocaleString()} đ
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFromCart(item.food._id)}
                >
                  <Text style={styles.removeText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.total}>
            Tổng cộng: {totalPrice.toLocaleString()} đ
          </Text>

          <TouchableOpacity style={styles.checkoutBtn} onPress={placeOrder}>
            <Text style={styles.checkoutText}>🧾 Đặt hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.checkoutBtn, { backgroundColor: "#999" }]}
            onPress={clearCart}
          >
            <Text style={styles.checkoutText}>🗑 Xóa tất cả</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf5", padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 14,
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 50,
    fontSize: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  name: { fontWeight: "bold", fontSize: 16, color: "#333" },
  detail: { color: "#777", marginVertical: 2 },
  totalLine: { color: "#ff6600", fontWeight: "bold" },
  removeBtn: {
    backgroundColor: "#ff3300",
    padding: 8,
    borderRadius: 8,
  },
  removeText: { color: "#fff", fontWeight: "bold" },
  total: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6600",
    marginVertical: 14,
  },
  checkoutBtn: {
    backgroundColor: "#ff6600",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  checkoutText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default CartScreen;
