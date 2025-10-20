import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import CartScreen from "../screens/user/CartScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import FoodDetailScreen from "../screens/user/FoodDetailScreen";

const Tab = createBottomTabNavigator();

const UserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ff6600",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Cart") iconName = "cart";
          else if (route.name === "Profile") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Trang chủ */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Trang chủ" }}
      />

      {/* Giỏ hàng */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Giỏ hàng" }}
      />

      {/* Hồ sơ người dùng */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Tôi" }}
      />

      {/* ✅ Màn hình chi tiết món — không hiện tab bar */}
      <Tab.Screen
        name="FoodDetail"
        component={FoodDetailScreen}
        options={{
          tabBarButton: () => null,
          title: "Chi tiết món",
        }}
      />
    </Tab.Navigator>
  );
};

export default UserTabs;
