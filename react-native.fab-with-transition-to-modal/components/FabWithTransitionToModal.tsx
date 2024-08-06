import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";

type Props = {
  modalContent: React.ReactNode;
  screenEdgeOffset: number;
};

export type FabWithTransitionToModalRef = {
  collapse: () => void;
  expand: () => void;
};

const FabWithTransitionToModal = forwardRef<FabWithTransitionToModalRef, Props>(
  function ({ modalContent, screenEdgeOffset }, ref) {
    const [isExpanded, setIsExpanded] = useState(false);
    const expandedWidth = Dimensions.get("window").width - screenEdgeOffset * 2;

    const [modalContentHeight, setModalContentHeight] = useState(0);

    const collapse = useCallback(() => {
      setIsExpanded(false);
    }, []);

    const expand = useCallback(() => {
      setIsExpanded(true);
    }, []);

    useImperativeHandle(ref, () => ({
      collapse,
      expand,
    }));

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
            height: isExpanded ? modalContentHeight : 56,
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={expand} />
        </View>
        <View
          style={{
            position: "absolute",
            width: expandedWidth,
          }}
          onLayout={({ nativeEvent }) => {
            setModalContentHeight(nativeEvent.layout.height);
          }}
        >
          {isExpanded && modalContent}
        </View>
      </View>
    );
  }
);

export default FabWithTransitionToModal;
