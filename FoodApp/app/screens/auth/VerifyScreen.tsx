import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const VerifyScreen = ({ route, navigation }: any) => {
  const { verifyAccount } = useContext(AuthContext);
  const { email } = route.params;

  const handleVerify = () => {
    verifyAccount(email);
    navigation.navigate("Login");
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
  button: { backgroundColor: "#f97316", padding: 12, borderRadius: 8, width: "80%", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default VerifyScreen;
