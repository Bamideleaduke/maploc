import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { Colors } from "../constant/Styles";
import CustomButton from "../components/ui/CustomButton";
import { fetchPlaceById } from "../utils/database";

const PlaceDetails = ({ route, navigation }) => {
  const [placeDetails, setPlaceDetails] = useState<any>();

  const selectedPlaceId = route.params.placeId;

  function handleShowOnMap() {
    navigation.navigate("Map", {
      initialLat: placeDetails.lat,
      initialLng: placeDetails.lng,
    });
  }

  useEffect(() => {
    const getSinglePlace = async () => {
      const result = await fetchPlaceById(selectedPlaceId);
      setPlaceDetails(result);
      navigation.setOptions({
        title: result.title,
      });
      return result;
    };
    getSinglePlace();
  }, []);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: placeDetails?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails?.address}</Text>
        </View>
        <CustomButton icon="map" onPress={handleShowOnMap}>
          View on Map
        </CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetails;
