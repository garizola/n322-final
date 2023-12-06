import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import ListsScreen from "./screens/ListsScreen";
import ListDetailScreen from "./screens/ListDetailScreen";
import { auth, app } from "./firebaseConfig";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribe();
  }, []);

  if (initializing) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Lists"
          component={ListsScreen}
          options={{ title: "My Lists" }}
        />
        <Stack.Screen
          name="ListDetail"
          component={ListDetailScreen}
          options={{ title: "List Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
