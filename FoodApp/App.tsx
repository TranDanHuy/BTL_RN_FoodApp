import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./app/context/AuthContext";
import RootNavigator from "./app/navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
