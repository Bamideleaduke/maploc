import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/database";

const AddPlace = ({ navigation }) => {
  const handleCreatePlace = async (place: any) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place: place,
    });
  };

  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};

export default AddPlace;
