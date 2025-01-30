import React from "react";
import { View, StyleSheet } from "react-native";

const WebMarker = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <View style={styles.marker}>
      <View style={styles.innerCircle} />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  innerCircle: {
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default WebMarker;
