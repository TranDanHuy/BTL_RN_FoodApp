import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import AuthStack from "./AuthStack";
import UserTabs from "./UserTabs";
import AdminDrawer from "./AdminDrawer";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { user } = useContext(AuthContext);
  console.log("👤 Current user:", user);

  return (
    <CartProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : user.role === "admin" ? (
          <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
        ) : (
          <Stack.Screen name="UserTabs" component={UserTabs} />
        )}
      </Stack.Navigator>
    </CartProvider>
  );
};

export default RootNavigator;
