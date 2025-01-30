import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MapView = () => (
  <View style={styles.placeholder}>
    <Text>Map functionality is not supported on web.</Text>
  </View>
);

export default MapView;

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
