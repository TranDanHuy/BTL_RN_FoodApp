import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from "react-native";

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text style={styles.title}>🍔 FoodApp</Text>
      <ActivityIndicator size="large" color="#f97316" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f97316",
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
});

export default SplashScreen;