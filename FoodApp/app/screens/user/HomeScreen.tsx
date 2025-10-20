import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { getFoods, Food } from "../../services/foodService";
import { getImage } from "../../utils/imageMapper";

const HomeScreen = ({ navigation }: any) => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getFoods();
      setFoods(data);
    };
    load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Món ăn nổi bật
      </Text>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("FoodDetail", { food: item })}
            style={{ marginBottom: 12 }}
          >
            <Image
              source={getImage(item.image)} // ✅ Sửa chỗ require()
              style={{ width: "100%", height: 160, borderRadius: 8 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 6 }}>
              {item.name}
            </Text>
            <Text style={{ color: "#555" }}>{item.price} đ</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
