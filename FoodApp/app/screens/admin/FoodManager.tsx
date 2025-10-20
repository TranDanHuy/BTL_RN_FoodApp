import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import {
  getFoods,
  addFood,
  updateFood,
  deleteFood,
  Food,
} from "../../services/foodService";
import { getImage } from "../../utils/imageMapper";
import { Ionicons } from "@expo/vector-icons";

const FoodManager = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  // form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const loadFoods = async () => {
    setLoading(true);
    const data = await getFoods();
    setFoods(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setImage("");
    setDescription("");
    setEditingFood(null);
  };

  const openAddModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const openEditModal = (item: Food) => {
    setEditingFood(item);
    setName(item.name);
    setPrice(item.price.toString());
    setCategory(item.category);
    setImage(item.image);
    setDescription(item.description);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!name || !price || !category) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập đầy đủ tên, giá và loại món ăn");
      return;
    }

    const newFood = {
      name,
      price: parseFloat(price),
      category,
      image: image || "default",
      description: description || "Không có mô tả",
    };

    if (editingFood) {
      await updateFood(editingFood.id, newFood);
      Alert.alert("✔", "Cập nhật món ăn thành công!");
    } else {
      await addFood(newFood);
      Alert.alert("✔", "Thêm món mới thành công!");
    }

    setModalVisible(false);
    resetForm();
    loadFoods();
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa món này?", [
      { text: "Hủy" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await deleteFood(id);
          loadFoods();
        },
      },
    ]);
  };

  const openPreview = (item: Food) => {
    setSelectedFood(item);
    setPreviewVisible(true);
  };

  const renderItem = ({ item }: { item: Food }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.8}
      onPress={() => openPreview(item)}
    >
      <Image source={getImage(item.image)} style={styles.thumbnail} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.iconButton}>
          <Ionicons name="create-outline" size={22} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý món ăn</Text>

      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text style={styles.addText}>+ Thêm món mới</Text>
      </TouchableOpacity>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Modal thêm/sửa */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editingFood ? "Sửa món ăn" : "Thêm món mới"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Tên món"
            value={name}
            onChangeText={setName}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Giá"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Loại món (Đồ uống / Món chính)"
            value={category}
            onChangeText={setCategory}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Tên ảnh (TraSua, Pizza...)"
            value={image}
            onChangeText={setImage}
          />
          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline
            placeholder="Mô tả món ăn"
            value={description}
            onChangeText={setDescription}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#4CAF50" }]}
              onPress={handleSave}
            >
              <Text style={styles.modalButtonText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#ff4d4d" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "#ff6600", marginBottom: 10 },
  item: {
    backgroundColor: "#fff3e6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnail: { width: 70, height: 70, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: "600" },
  category: { fontSize: 13, color: "#777" },
  price: { color: "#ff6600", marginVertical: 4 },
  actions: { flexDirection: "column", marginLeft: 10 },
  iconButton: { padding: 6, marginHorizontal: 3 },
  addButton: {
    backgroundColor: "#ff6600",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalContainer: { padding: 20, backgroundColor: "#fff", flexGrow: 1 },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6600",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default FoodManager;
