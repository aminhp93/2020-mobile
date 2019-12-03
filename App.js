import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TaskComponent from "./components/TaskComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>2020 Mobile project</Text>
      <TaskComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  }
});
