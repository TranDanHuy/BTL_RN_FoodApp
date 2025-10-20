import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Thông tin người dùng
      </Text>

      <Text style={{ fontSize: 16, color: "#555" }}>
        Đây là màn hình hồ sơ cá nhân (Profile Screen)
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#f97316",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
