import FabWithTransitionToModal, {
  FabWithTransitionToModalRef,
} from "@/components/FabWithTransitionToModal";
import { useRef } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const fabRef = useRef<FabWithTransitionToModalRef>(null);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World</Text>
      <FabWithTransitionToModal
        fabContent={
          <Text
            style={{
              color: "white",
              fontSize: 32,
            }}
          >
            +
          </Text>
        }
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
            <Button title="Done" onPress={() => fabRef.current?.collapse()} />
          </View>
        }
        ref={fabRef}
        screenEdgeOffset={32}
      />
    </View>
  );
}
