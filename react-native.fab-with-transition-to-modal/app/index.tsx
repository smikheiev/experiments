import FabWithTransitionToModal from "@/components/FabWithTransitionToModal";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World</Text>
      <FabWithTransitionToModal screenEdgeOffset={32} />
    </View>
  );
}
