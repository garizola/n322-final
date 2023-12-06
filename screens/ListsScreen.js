import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import {
  Button,
  TextInput,
  List,
  TouchableOpacity,
  Icon,
  IconButton,
} from "react-native-paper";
import { commonStyles } from "../styles";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, app } from "../firebaseConfig";

export default function ListsScreen({ navigation }) {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  const firestore = getFirestore(app);

  const fetchLists = async () => {
    try {
      const userListsCollection = collection(
        firestore,
        "users",
        auth.currentUser.uid,
        "lists"
      );
      const listsSnapshot = await getDocs(userListsCollection);
      const listsData = listsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLists(listsData);
    } catch (error) {
      console.error("Error - lists:", error.message);
    }
  };

  const addList = async () => {
    try {
      if (!newListName.trim()) {
        return;
      }

      const newList = {
        name: newListName,
      };

      const userListsCollection = collection(
        firestore,
        "users",
        auth.currentUser.uid,
        "lists"
      );
      await addDoc(userListsCollection, newList);
      fetchLists();
      setNewListName("");
    } catch (error) {
      console.error("Error +++ list:", error.message);
    }
  };

  const deleteList = async (listId) => {
    try {
      const listDocRef = doc(
        firestore,
        `users/${auth.currentUser.uid}/lists/${listId}`
      );
      await deleteDoc(listDocRef);

      // Refresh the lists
      fetchLists();
    } catch (error) {
      console.error("Error deleting list:", error.message);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>Lists Screen</Text>

      <View>
        <TextInput
          label="New List Name"
          value={newListName}
          onChangeText={setNewListName}
          style={commonStyles.inputs}
        />
        <Button onPress={addList} style={commonStyles.button} mode="contained">
          Add List
        </Button>
      </View>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            onPress={() => {
              navigation.navigate("ListDetail", { listId: item.id });
            }}
            right={(props) => (
              <IconButton
                {...props}
                icon="delete"
                color="red"
                onPress={() => deleteList(item.id)}
              />
            )}
            style={commonStyles.listItem}
          />
        )}
      />
    </View>
  );
}
