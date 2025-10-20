import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserTabs from "./UserTabs";

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserTabs" component={UserTabs} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
