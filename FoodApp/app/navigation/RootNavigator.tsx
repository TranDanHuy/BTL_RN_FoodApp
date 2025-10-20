import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import UserTabs from "./UserTabs";
import AdminDrawer from "./AdminDrawer";

const Stack = createStackNavigator();

const RootNavigator = () => {
  // Lấy thông tin user từ AuthContext
  const { user } = useContext(AuthContext);
  console.log("👤 Current user:", user);


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Nếu chưa đăng nhập → vào AuthStack (Splash, Login, Register, Verify) */}
      {!user ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />

      ) : user.role === "admin" ? (
        // Nếu user có role = admin → vào Drawer của admin
        <Stack.Screen name="AdminDrawer" component={AdminDrawer} />

      ) : (
        // Còn lại (user thường) → vào BottomTabs
        <Stack.Screen name="UserTabs" component={UserTabs} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
