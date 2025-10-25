import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { getFoods } from "../../services/foodService";
import { getOrders } from "../../services/orderService";
import { getUsers } from "../../services/userService";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const AdminDashboard = () => {
  const [foodCount, setFoodCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const foods = await getFoods();
      const orders = await getOrders();
      const users = await getUsers();

      setFoodCount(foods.length);
      setOrderCount(orders.length);
      setUserCount(users.length);
    } catch (error) {
      console.error("Lỗi khi tải thống kê:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const chartData = [
    {
      name: "Món ăn",
      count: foodCount,
      color: "#f59e0b",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Đơn hàng",
      count: orderCount,
      color: "#10b981",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Người dùng",
      count: userCount,
      color: "#3b82f6",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Trang quản trị hệ thống</Text>
      <Text style={styles.subtitle}>Thống kê dữ liệu tổng quan</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#ff6600" style={{ marginTop: 30 }} />
      ) : (
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: () => "#000",
          }}
          accessor={"count"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default AdminDashboard;