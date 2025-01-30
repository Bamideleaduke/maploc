import { RouteProp } from "@react-navigation/native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RootStackParamList } from "../App";
import { Colors } from "../constant/Styles";
import { MapHeader } from "../components/TabHeader";

type MapScreenRouteProp = RouteProp<RootStackParamList, "Map">;

type MapScreenProps = {
  route: MapScreenRouteProp;
  navigation: any;
};

const MapDisplay: React.FC<MapScreenProps> = ({ route, navigation }) => {
  const { lat = 37.78, lng = -122.43 } = route.params || {};
  const initialLocation = route.params.initialLat && {
    lat: route.params?.initialLat,
    lng: route.params?.initialLng,
  };
  const [selectedLocation, setselectedLocation] = useState<{
    lat: number;
    lng: number;
  }>(initialLocation ?? { lat: lat, lng: lng });

  const region = {
    latitude: initialLocation ? initialLocation?.lat : lat,
    longitude: initialLocation ? initialLocation?.lng : lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleLocationSelection = (event: any) => {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setselectedLocation({ lat: lat, lng: lng });
  };

  const handleSaveSelectedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "no location picked",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      selectedLat: selectedLocation.lat,
      selectedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  if (!route.params) {
    return (
      <View style={styles.container}>
        <Text style={styles.textColor}>
          Location data is missing or invalid.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapHeader
        title="Real time location"
        onSave={handleSaveSelectedLocation}
        allowSave={!initialLocation}
      />
      <StatusBar barStyle="dark-content" backgroundColor={Colors.primary500} />
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={handleLocationSelection}
      >
        {selectedLocation && (
          <Marker
            title="Selected Location"
            coordinate={{
              latitude: selectedLocation?.lat,
              longitude: selectedLocation?.lng,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  textColor: {
    color: Colors.primary100,
  },
});

export default MapDisplay;
