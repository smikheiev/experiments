import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { AnimatePresence, MotiView } from "moti";

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
          overflow: "hidden",
        }}
      >
        <MotiView
          animate={{
            width: isExpanded ? expandedWidth : 56,
            height: isExpanded ? modalContentHeight : 56,
          }}
          transition={{
            type: "timing",
            duration: 300,
          }}
          style={{
            backgroundColor: "black",
            borderRadius: 16,
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={expand} />
        </MotiView>
        <View
          style={{
            position: "absolute",
            width: expandedWidth,
          }}
          onLayout={({ nativeEvent }) => {
            setModalContentHeight(nativeEvent.layout.height);
          }}
        >
          <AnimatePresence>
            {isExpanded && (
              <MotiView
                from={{
                  opacity: 0,
                  translateY: 100,
                }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  opacity: {
                    type: "timing",
                    duration: 900,
                  },
                  translateY: {
                    type: "timing",
                    duration: 600,
                  },
                }}
              >
                {modalContent}
              </MotiView>
            )}
          </AnimatePresence>
        </View>
      </View>
    );
  }
);

export default FabWithTransitionToModal;
