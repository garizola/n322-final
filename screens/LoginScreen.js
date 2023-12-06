import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { commonStyles } from "../styles";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [signInUserEmail, setSignInUserEmail] = useState("");
  const [signInUserPW, setSignInUserPW] = useState("");
  const [createUserFName, setCreateUserFName] = useState("");
  const [createUserLName, setCreateUserLName] = useState("");
  const [createUserEmail, setCreateUserEmail] = useState("");
  const [createUserPW, setCreateUserPW] = useState("");

  const signInUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, signInUserEmail, signInUserPW);
      navigation.navigate("Lists");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const createUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, createUserEmail, createUserPW);
      await signInWithEmailAndPassword(auth, createUserEmail, createUserPW);
      navigation.navigate("Lists");
    } catch (error) {
      console.error("Error creating account:", error.message);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>Login</Text>

      <TextInput
        style={commonStyles.inputs}
        label="Email"
        onChangeText={setSignInUserEmail}
        value={signInUserEmail}
      />
      <TextInput
        style={commonStyles.inputs}
        secureTextEntry={true}
        label="Password"
        onChangeText={setSignInUserPW}
        value={signInUserPW}
      />
      <Button onPress={signInUser} style={commonStyles.button} mode="contained">
        Sign In
      </Button>

      <Text style={commonStyles.orText}>OR</Text>

      <Text style={commonStyles.header}>Create Account</Text>
      <TextInput
        onChangeText={setCreateUserFName}
        style={commonStyles.inputs}
        label="First Name"
        value={createUserFName}
      />
      <TextInput
        onChangeText={setCreateUserLName}
        style={commonStyles.inputs}
        label="Last Name"
        value={createUserLName}
      />
      <TextInput
        onChangeText={setCreateUserEmail}
        style={commonStyles.inputs}
        label="Email"
        value={createUserEmail}
      />
      <TextInput
        onChangeText={setCreateUserPW}
        style={commonStyles.inputs}
        secureTextEntry={true}
        label="Password"
        value={createUserPW}
      />
      <Button onPress={createUser} style={commonStyles.button} mode="contained">
        Create Account
      </Button>
    </View>
  );
}
