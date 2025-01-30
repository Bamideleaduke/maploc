import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text, Image } from "react-native";
import CustomButton from "../ui/CustomButton";
import { Colors } from "../../constant/Styles";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { getAddress, getMapPreview } from "../../utils/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type MapScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Map"
>;

const LocationPicker = ({ onSelectedLocation }: any) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const isFocused = useIsFocused();

  const navigation = useNavigation<MapScreenNavigationProp>();
  const route = useRoute<any>();

  const VerifyPermission = async () => {
    if (!locationPermissionInformation) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app"
      );
      return false;
    }
    return true;
  };
  const handleGetLocation = async () => {
    const hasPermission = await VerifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setSelectedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  useEffect(() => {
    async function handleLocation() {
      if (selectedLocation) {
        const address = await getAddress(
          selectedLocation.lat,
          selectedLocation.lng
        );
        onSelectedLocation({ ...selectedLocation, address: address });
      }
    }
    handleLocation();
  }, [selectedLocation, onSelectedLocation]);

  let locationPreview = <Text>No location picked yet.</Text>;

  if (selectedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(selectedLocation.lat, selectedLocation.lng),
        }}
      />
    );
  }

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.selectedLat,
        lng: route.params.selectedLng,
      };
      setSelectedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  const handlePickOnMap = () => {
    navigation.navigate("Map", {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  };

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <CustomButton icon="location" onPress={handleGetLocation}>
          Locate User
        </CustomButton>
        <CustomButton icon="map" onPress={handlePickOnMap}>
          Pick on Map
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
export default LocationPicker;
