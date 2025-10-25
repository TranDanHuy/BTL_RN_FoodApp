import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const VerifyScreen = ({ route, navigation }: any) => {
  const { checkVerification } = useContext(AuthContext);
  const { email } = route.params;

  const handleVerify = async () => {
    const isVerified = await checkVerification(email);
    console.log("Tình trạng xác minh:", isVerified);
    if (isVerified) {
      Alert.alert("Tài khoản đã được xác minh!");
      navigation.navigate("Login");
    } else {
      Alert.alert("Tài khoản chưa được xác minh", "Vui lòng kiểm tra email và thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác minh tài khoản</Text>
      <Text style={styles.subtitle}>Mã xác minh đã gửi tới: {email}</Text>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Xác minh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
  button: {
    backgroundColor: "#f97316",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default VerifyScreen;