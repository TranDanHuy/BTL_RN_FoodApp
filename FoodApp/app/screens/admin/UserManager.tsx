import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserManager = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý người dùng</Text>
      <Text style={styles.subtitle}>Danh sách user sẽ hiển thị tại đây</Text>
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

export default UserManager;
