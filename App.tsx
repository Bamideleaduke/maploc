import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import { Colors } from "./constant/Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapDisplay from "./screens/Map";
import { runDatabaseOperations } from "./utils/database";
import PlaceDetails from "./screens/PlaceDetails";
import "dotenv/config";

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: undefined;
  Map: { lat: number; lng: number; initialLat?: number; initialLng?: number };
  PlaceDetails: { placeId: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    runDatabaseOperations()
      .then(() => {
        setDbInitialized(true);
        console.log("db initilized");
      })
      .catch((err) => {
        console.log("error App", err);
      });
  }, []);

  if (!dbInitialized) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            id={undefined}
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary500 },
              headerTintColor: Colors.gray700,
              contentStyle: { backgroundColor: Colors.gray700 },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                headerShown: false,
                // headerRight: () => (
                //   <TouchableOpacity
                //     onPress={() => {
                //       navigation.navigate("AddPlace");
                //     }}
                //     // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                //   >
                //     <Ionicons name="add" size={24} color="black" />
                //   </TouchableOpacity>
                // ),

                // headerRight: ({ tintColor }) => (
                //   <IconButton
                //     icon="add"
                //     size={24}
                //     color={tintColor}
                //     onPress={() => {
                //       console.log("Button Pressed");
                //       // console.log("navigation", navigation);
                //       navigation.navigate("AddPlace");
                //     }}
                //   />
                // ),
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{ title: "Add a new place" }}
            />
            <Stack.Screen
              name="Map"
              component={MapDisplay}
              options={{ title: "User realtime location", headerShown: false }}
            />
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetails}
              options={{ title: "Loading Place" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
