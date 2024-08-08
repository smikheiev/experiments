import { useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [items, _] = useState(
    new Array(20).fill(0).map((_, index) => ({ id: index }))
  );

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        padding: 16,
      }}
    >
      {items.map((item) => (
        <View
          key={item.id}
          style={{
            padding: 16,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24 }}>{item.id}</Text>
        </View>
      ))}
    </View>
  );
}
