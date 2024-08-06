import { useCallback, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";

type Props = {
  screenEdgeOffset: number;
};

export default function FabWithTransitionToModal({ screenEdgeOffset }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedWidth = Dimensions.get("window").width - screenEdgeOffset * 2;

  const expand = useCallback(() => {
    setIsExpanded(true);
  }, []);

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
          width: isExpanded ? expandedWidth : 56,
          height: isExpanded ? expandedWidth : 56,
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={expand} />
      </View>
    </View>
  );
}
