import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Button, TextInput, List, Snackbar } from "react-native-paper";
import { commonStyles } from "../styles";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, app } from "../firebaseConfig";

export default function ListDetailScreen({ route }) {
  const { listId } = route.params || {};
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const firestore = getFirestore(app);

  const fetchItems = async () => {
    try {
      const listItemsCollection = collection(
        firestore,
        "users",
        auth.currentUser.uid,
        "lists",
        listId,
        "items"
      );
      const itemsSnapshot = await getDocs(listItemsCollection);
      const itemsData = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);
    } catch (error) {
      console.error("Error getting items:", error.message);
    }
  };

  const addItem = async () => {
    try {
      if (!newItemName.trim()) {
        return;
      }

      const newItem = {
        name: newItemName,
      };

      const listItemsCollection = collection(
        firestore,
        "users",
        auth.currentUser.uid,
        "lists",
        listId,
        "items"
      );
      await addDoc(listItemsCollection, newItem);
      fetchItems();
      setNewItemName("");
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const listItemsCollection = collection(
        firestore,
        "users",
        auth.currentUser.uid,
        "lists",
        listId,
        "items"
      );
      const itemDoc = collection(listItemsCollection, itemId);
      await deleteDoc(itemDoc);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  useEffect(() => {
    if (listId) {
      fetchItems();
    }
  }, [listId]);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>List Detail Screen</Text>

      <View>
        <TextInput
          label="New Item Name"
          value={newItemName}
          onChangeText={setNewItemName}
          style={commonStyles.inputs}
        />
        <Button onPress={addItem} style={commonStyles.button} mode="contained">
          Add Item
        </Button>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            right={(props) => (
              <List.Icon
                {...props}
                icon="delete"
                onPress={() => deleteItem(item.id)}
              />
            )}
            style={commonStyles.listItem}
          />
        )}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        Item added successfully!
      </Snackbar>
    </View>
  );
}
