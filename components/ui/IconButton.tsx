import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IoniconName } from "../../constant/types";
import { TouchableOpacity } from "react-native";

interface IconButtonProp {
  icon: IoniconName;
  size: number;
  color: string;
  onPress: () => void;
}

const IconButton = ({ icon, size, color, onPress }: IconButtonProp) => {
  return (
    <TouchableOpacity
      // style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
export default IconButton;
