import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AdminDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang quản trị hệ thống</Text>
      <Text style={styles.subtitle}>Chọn mục từ menu để quản lý dữ liệu</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});

export default AdminDashboard;
