import { StyleSheet } from "react-native";

export const HEIGHT = 64;
export const MARGIN_BOTTOM = 12;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#686868",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    color: "#EEE"
  }
});