import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constant/Styles";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../model/place";

const PlaceForm = ({ onCreatePlace }: any) => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedLocation, setselectedLocation] = useState<any>({});

  function HandleTakeImage(imageUri: any) {
    setSelectedImage(imageUri);
  }

  const HandlePickLocation = useCallback((location: any) => {
    setselectedLocation(location);
  }, []);

  const HandleTitleChange = (value: string) => {
    setTitle(value);
  };

  function handleSavePlace() {
    const placeData = new Place(title, selectedImage, selectedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={HandleTitleChange}
          value={title}
        />
      </View>
      <ImagePicker onTakeImage={HandleTakeImage} />
      <LocationPicker onSelectedLocation={HandlePickLocation} />
      <Button onPress={handleSavePlace}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
