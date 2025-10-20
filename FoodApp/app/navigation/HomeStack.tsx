import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/user/HomeScreen";
import FoodDetailScreen from "../screens/user/FoodDetailScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} options={{ title: "Chi tiết món" }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
