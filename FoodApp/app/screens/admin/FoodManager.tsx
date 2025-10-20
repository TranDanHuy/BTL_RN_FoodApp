import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FoodManager = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý món ăn</Text>
      <Text style={styles.subtitle}>Danh sách món ăn sẽ hiển thị tại đây</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f97316",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
});

export default FoodManager;
