import React, { useState, useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../../context/CartContext";
import { getImage } from "../../utils/imageMapper";
import { useNavigation } from "@react-navigation/native";

const FoodDetailScreen = ({ route }: any) => {
  const { food } = route.params;
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const navigation = useNavigation();

  // Ẩn Bottom Tab khi vào trang chi tiết
  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: "none" } });

    return () => parent?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={getImage(food.image)} style={styles.image} />
      <Text style={styles.name}>{food.name}</Text>
      <Text style={styles.price}>{food.price.toLocaleString()} đ</Text>
      <Text style={styles.desc}>{food.description}</Text>

      <View style={styles.quantityBox}>
        <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
          <Text style={styles.qtyButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{qty}</Text>
        <TouchableOpacity onPress={() => setQty(qty + 1)}>
          <Text style={styles.qtyButton}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          addToCart(food, qty);
          navigation.navigate("Cart" as never);
        }}
      >
        <Text style={styles.addText}>🛒 Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  image: { width: "100%", height: 250, borderRadius: 10 },
  name: { fontSize: 22, fontWeight: "bold", color: "#ff6600", marginTop: 10 },
  price: { fontSize: 18, color: "#ff3300", marginVertical: 5 },
  desc: { color: "#555", fontSize: 15, marginBottom: 10 },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  qtyButton: { fontSize: 28, paddingHorizontal: 15, color: "#ff6600" },
  qtyValue: { fontSize: 20, marginHorizontal: 10 },
  addButton: {
    backgroundColor: "#ff6600",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default FoodDetailScreen;
