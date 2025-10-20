import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
} from "react-native";
import { getFoods, Food } from "../../services/foodService";
import { getImage } from "../../utils/imageMapper";
import { AuthContext } from "../../context/AuthContext";

const HomeScreen = ({ navigation }: any) => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState<Food[]>([]);
  const [visible, setVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // 🎉 Hiển thị popup chào mừng
  useEffect(() => {
    if (user) {
      setVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => handleClose(), 20000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  // 🍔 Load danh sách món ăn
  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const data = await getFoods();
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
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />

      {/* 🎉 Popup chào mừng */}
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <Animated.View style={[styles.popup, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>

            <Image
              source={require("../../../assets/images/Welcome.webp")}
              style={styles.popupImage}
            />

            <Text style={styles.title}>🎉 Chào mừng trở lại!</Text>
            <Text style={styles.message}>
              Rất vui khi gặp lại{" "}
              <Text style={{ fontWeight: "bold", color: "#f97316" }}>
                {user?.fullName || "bạn"}
              </Text>
              {" "}☕{"\n"}Chúc bạn một ngày thật tuyệt vời!
            </Text>
          </Animated.View>
        </View>
      </Modal>
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

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  popupImage: { width: 110, height: 110, resizeMode: "contain" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6600",
    marginTop: 12,
  },
  message: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 14,
    zIndex: 10,
  },
  closeText: {
    fontSize: 30,
    color: "#bbb",
    fontWeight: "bold",
  },
});

export default HomeScreen;
