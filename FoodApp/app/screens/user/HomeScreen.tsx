import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getFoods, Food } from "../../services/foodService";
import { getImage } from "../../utils/imageMapper";

const HomeScreen = ({ navigation }: any) => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const data = await getFoods();
    setFoods(data);
  };

  // ✅ Khi bấm vào món sẽ chuyển đến FoodDetail
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
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  header: { fontSize: 22, fontWeight: "bold", color: "#ff6600", marginBottom: 10 },
  card: {
    backgroundColor: "#fff3e6",
    borderRadius: 10,
    padding: 10,
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
  },
  image: { width: 100, height: 100, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: "600", textAlign: "center", marginTop: 5 },
  category: { fontSize: 13, color: "#777" },
  price: { color: "#ff6600", marginTop: 4 },
});

export default HomeScreen;
