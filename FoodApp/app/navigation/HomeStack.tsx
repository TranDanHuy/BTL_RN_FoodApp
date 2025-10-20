import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeScreen from "../screens/user/HomeScreen";
import FoodDetailScreen from "../screens/user/FoodDetailScreen";

const Stack = createStackNavigator();

const HomeStack = ({ navigation, route }: any) => {
  // 👇 Ẩn tab bar khi ở màn FoodDetail
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    if (routeName === "FoodDetail") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
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
      });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 🏠 Trang chủ */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      {/* 🍔 Chi tiết món — có header và nút quay lại */}
      <Stack.Screen
        name="FoodDetail"
        component={FoodDetailScreen}
        options={{
          headerShown: true, // ✅ bật lại header riêng cho màn chi tiết
          title: "Chi tiết món",
          headerTintColor: "#ff6600", // màu nút Back
          headerTitleStyle: { fontWeight: "600", color: "#333" },
          headerStyle: { backgroundColor: "#fffaf5", elevation: 0 },
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
