import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const ProfileScreen = () => {
  const { logout, user } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  const handleStatusPress = (status: string) => {
    Alert.alert("🚧 Đang phát triển", `Chức năng "${status}" đang được hoàn thiện.`);
  };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Mã người dùng:</Text>
        <Text style={styles.value}>{user?.customId || "Không có"}</Text>

        <Text style={styles.label}>Họ và tên:</Text>
        <Text style={styles.value}>{user?.fullName || "Không rõ"}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || "Không rõ"}</Text>

        <Text style={styles.label}>Vai trò:</Text>
        <Text style={styles.value}>
          {user?.role === "admin" ? "Quản trị viên" : "Người dùng"}
        </Text>

        <Text style={styles.label}>Trạng thái:</Text>
        <Text style={[styles.value, { color: user?.active ? "#28a745" : "#dc3545" }]}>
          {user?.active ? "Đã xác minh" : "Chưa xác minh"}
        </Text>
      </View>

      {/* Accordion trạng thái đơn hàng */}
      <View style={styles.statusBox}>
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.statusTitle}>
            📦 Trạng thái đơn hàng {expanded ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {expanded && (
          <View style={styles.statusList}>
            {["Chờ xác nhận", "Chờ lấy hàng", "Chờ giao hàng", "Đã giao"].map(
              (status, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.statusBtn}
                  onPress={() => handleStatusPress(status)}
                >
                  <Text style={styles.statusText}>{status}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ff6600",
  },
  infoBox: {
    marginBottom: 30,
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  statusBox: {
    marginBottom: 30,
    backgroundColor: "#fff3e6",
    padding: 20,
    borderRadius: 10,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 10,
    textAlign: "center",
  },
  statusList: {
    marginTop: 10,
  },
  statusBtn: {
    backgroundColor: "#ffe0b3",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  button: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;