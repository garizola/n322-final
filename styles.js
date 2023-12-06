// styles.js
import { StyleSheet } from "react-native";

const colors = {
  darkGrey: "#999",
  orange: "#333",
  white: "#ddd",
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGrey,
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: colors.orange,
  },
  inputs: {
    marginTop: 10,
    backgroundColor: colors.white,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.orange,
    color: colors.darkGrey,
  },
  orText: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "700",
    color: "#fff",
  },
  btnText: {
    color: colors.darkGrey,
  },
  listItem: {
    backgroundColor: colors.white,
    marginBottom: 4,
  },
});

export default colors;
