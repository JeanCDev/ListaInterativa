import { StyleSheet } from "react-native";
import { HEIGHT, MARGIN_BOTTOM } from "../Card/styles";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    height: HEIGHT,
    marginBottom: MARGIN_BOTTOM
  },
  list: {
    flex: 1,
    padding: 32
  }
});