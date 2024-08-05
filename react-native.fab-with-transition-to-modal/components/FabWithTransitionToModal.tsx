import { Pressable, View } from "react-native";

type Props = {
  screenEdgeOffset: number;
};

export default function FabWithTransitionToModal({ screenEdgeOffset }: Props) {
  return (
    <View
      style={{
        position: "absolute",
        left: screenEdgeOffset,
        bottom: screenEdgeOffset,
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          borderRadius: 16,
          width: 56,
          height: 56,
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={() => console.log("Pressed")} />
      </View>
    </View>
  );
}
