import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const [items, setItems] = useState(
    new Array(20).fill(0).map((_, index) => ({ id: index }))
  );

  const addItem = () => {
    setItems((items) => {
      const lastItem = items[items.length - 1];
      return [...items, { id: (lastItem?.id ?? 0) + 1 }];
    });
  };

  const removeItem = (itemId: number) => {
    setItems((items) => items.filter((item) => item.id !== itemId));
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 16,
          padding: 16,
        }}
      >
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={{
              padding: 16,
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => removeItem(item.id)}
          >
            <Text style={{ fontSize: 24 }}>{item.id}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        style={{
          backgroundColor: "black",
          width: 52,
          aspectRatio: 1,
          borderRadius: 16,
          position: "absolute",
          bottom: 32,
          right: 32,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={addItem}
      >
        <Text style={{ color: "white", fontSize: 32 }}>+</Text>
      </Pressable>
    </>
  );
}
