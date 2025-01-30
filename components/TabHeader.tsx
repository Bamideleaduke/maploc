import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constant/Styles";

const TabHeader = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.tabHeader}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Favorite Places</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddPlace");
          }}
          // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const MapHeader = ({
  title = "Map",
  onSave,
  allowSave,
}: {
  title?: string;
  onSave: () => void;
  allowSave?: boolean;
}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.tabHeader}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>

        {allowSave && (
          <TouchableOpacity onPress={onSave} style={styles.saveButton}>
            <Ionicons name="save" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabHeader: {
    color: Colors.accent500,
    backgroundColor: Colors.primary500,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  headerContent: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    textAlign: "center",
  },
  saveButton: {
    padding: 8,
  },
});

export default TabHeader;
