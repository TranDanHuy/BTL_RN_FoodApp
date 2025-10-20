import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import CartScreen from "../screens/user/CartScreen";
import ProfileScreen from "../screens/user/ProfileScreen";

const Tab = createBottomTabNavigator();

const UserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ff6600",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fffaf5",
          height: 64,
          borderTopWidth: 0.5,
          borderTopColor: "#ffd6a5",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: -2,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Cart") iconName = "cart";
          else if (route.name === "Profile") iconName = "person";
          return (
            <Ionicons
              name={iconName}
              size={focused ? size + 2 : size}
              color={color}
              style={{ marginBottom: -2 }}
            />
          );
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
    </Tab.Navigator>
  );
};

export default UserTabs;
