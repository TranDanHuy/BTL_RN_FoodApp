import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CartContext } from "../../context/CartContext";
import { Food } from "../../services/foodService";
import { getImage } from "../../utils/imageMapper"; // ✅ thêm hàm ánh xạ

const FoodDetailScreen = ({ route, navigation }: any) => {
  const { food } = route.params as { food: Food };
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "#fff" }}>
      <Image
        source={getImage(food.image)} // ✅ fix require() động
        style={{ width: "100%", height: 200, borderRadius: 8 }}
      />

      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
        {food.name}
      </Text>
      <Text style={{ fontSize: 18, color: "#f97316", marginVertical: 8 }}>
        {food.price} đ
      </Text>
      <Text>{food.description}</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
          <Text style={{ fontSize: 22, paddingHorizontal: 15 }}>-</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18 }}>{qty}</Text>

        <TouchableOpacity onPress={() => setQty(qty + 1)}>
          <Text style={{ fontSize: 22, paddingHorizontal: 15 }}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          addToCart({ ...food, quantity: qty });
          navigation.navigate("Cart");
        }}
        style={{
          backgroundColor: "#f97316",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Thêm vào giỏ hàng
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodDetailScreen;
