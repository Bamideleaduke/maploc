import {
  launchCameraAsync,
  launchImageLibraryAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constant/Styles";
import CustomButton from "../ui/CustomButton";
// import * as Picker from "expo-image-picker";

const ImagePicker = ({ onTakeImage }: any) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  // const [cameraPermissionInformation, requestPermission] =
  //   Picker.useMediaLibraryPermissions();

  const VerifyPermission = async () => {
    if (!cameraPermissionInformation) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }
    return true;
  };

  const HandleImageTaker = async () => {
    const hasPermission = await VerifyPermission();

    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setSelectedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  };

  const HandleImagePicker = async () => {
    const hasPermission = await VerifyPermission();

    if (!hasPermission) {
      return;
    }
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setSelectedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  };

  let imagePreview = <Text>No image taken yet</Text>;

  if (selectedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: selectedImage }} />
    );
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <CustomButton icon="camera" onPress={HandleImageTaker}>
        Take Image
      </CustomButton>
      <CustomButton icon="image" onPress={HandleImagePicker}>
        Choose Image from Library
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
