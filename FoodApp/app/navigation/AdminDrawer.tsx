import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

import AdminDashboard from "../screens/admin/AdminDashboard";
import FoodManager from "../screens/admin/FoodManager";
import OrderManager from "../screens/admin/OrderManager";
import UserManager from "../screens/admin/UserManager";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Trang quản trị</Text>
      </View>

      {/* Danh sách item */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer (nút đăng xuất) */}
      <View style={styles.footer}>
        <DrawerItem
          label="Đăng xuất"
          labelStyle={styles.logoutLabel}
          style={styles.logoutButton}
          onPress={logout}
        />
      </View>
    </View>
  );
}

const AdminDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#ff6600" },
        headerTintColor: "#fff",
        drawerLabelStyle: { fontSize: 16, marginLeft: -10 },
        drawerActiveTintColor: "#ff6600",
        drawerActiveBackgroundColor: "#fff3e6",
      }}
    >
      <Drawer.Screen
        name="Tổng quan hệ thống"
        component={AdminDashboard}
        options={{ title: "Tổng quan hệ thống" }}
      />
      <Drawer.Screen
        name="Quản lý món ăn"
        component={FoodManager}
        options={{ title: "Quản lý món ăn" }}
      />
      <Drawer.Screen
        name="Quản lý đơn hàng"
        component={OrderManager}
        options={{ title: "Quản lý đơn hàng" }}
      />
      <Drawer.Screen
        name="Quản lý người dùng"
        component={UserManager}
        options={{ title: "Quản lý người dùng" }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff3e6",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ffe0b3",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6600",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 20,
    backgroundColor: "#fff",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
  },
  logoutLabel: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default AdminDrawer;