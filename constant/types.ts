import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export type MapScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Map"
>;
export type placeDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PlaceDetails"
>;