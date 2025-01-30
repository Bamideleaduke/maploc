import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlaceList";
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import IconButton from "../components/ui/IconButton";
import TabHeader from "../components/TabHeader";
import { Colors } from "../constant/Styles";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utils/database";

const AllPlaces = ({ route }: any) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    };

    if (isFocused) {
      getPlaces();
    }
  }, [isFocused, route]);

  return (
    <View style={styles.container}>
      <TabHeader />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary500} />
      <PlacesList places={loadedPlaces} />
      {/* <Button
        title="Click me"
        onPress={() => {
          navigation.navigate("AddPlace");
        }}
      />
      <IconButton
        icon="add"
        size={24}
        color="#fff"
        onPress={() => {
          navigation.navigate("AddPlace");
        }}
      /> */}
      {/* {Platform.OS === "web" && (
        <Text>This content is for Web browsers only!</Text>
      )}
      {Platform.OS === "ios" && (
        <Text>This content is for ios browsers only!</Text>
      )}
      {Platform.OS === "android" && (
        <Text>This content is for android browsers only!</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
  },
});

export default AllPlaces;
