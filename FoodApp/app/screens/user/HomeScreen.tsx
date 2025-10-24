import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getFoods, Food } from "../../services/foodService";
import { getImage } from "../../utils/imageMapper";

const HomeScreen = ({ navigation }: any) => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    console.log("🔄 Đang tải danh sách món ăn...");
    const data = await getFoods();
    console.log("📦 Dữ liệu món ăn nhận được trong HomeScreen:", data);
    setFoods(data);
  };

  const renderItem = ({ item }: { item: Food }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("FoodDetail", { food: item })}
    >
      <Image source={getImage(item.image)} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍔 Danh sách món ăn</Text>
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf5", padding: 12 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 14,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    width: "48%",
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 110, height: 110, borderRadius: 12 },
  name: { fontSize: 16, fontWeight: "600", textAlign: "center", marginTop: 8 },
  category: { fontSize: 13, color: "#888" },
  price: { color: "#ff6600", fontWeight: "bold", marginTop: 6 },
});

export default HomeScreen;
