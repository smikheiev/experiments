import FabWithTransitionToModal from "@/components/FabWithTransitionToModal";
import { Button, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World</Text>
      <FabWithTransitionToModal
        modalContent={
          <View style={{ padding: 16, alignItems: "center", gap: 16 }}>
            <Text
              style={{
                color: "white",
                fontSize: 32,
              }}
            >
              Hey there!
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                width: "80%",
                padding: 16,
                borderRadius: 16,
              }}
              placeholder="Enter text here"
            />
            <Button title="Done" onPress={() => console.log("Done")} />
          </View>
        }
        screenEdgeOffset={32}
      />
    </View>
  );
}
