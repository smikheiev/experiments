import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { BlurView } from "expo-blur";

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
      <>
        <AnimatePresence>
          {isExpanded && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={StyleSheet.absoluteFill}
            >
              <Pressable style={{ flex: 1 }} onPress={collapse}>
                <BlurView intensity={10} style={{ flex: 1 }} />
              </Pressable>
            </MotiView>
          )}
        </AnimatePresence>
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
            <Pressable
              pointerEvents={isExpanded ? "none" : "auto"}
              style={{ flex: 1 }}
              onPress={expand}
            />
          </MotiView>
          <View
            pointerEvents={isExpanded ? "auto" : "none"}
            style={{
              position: "absolute",
              width: expandedWidth,
            }}
            onLayout={({ nativeEvent }) => {
              setModalContentHeight(nativeEvent.layout.height);
            }}
          >
            <MotiView
              animate={{
                opacity: isExpanded ? 1 : 0,
                translateY: isExpanded ? 0 : 100,
              }}
              transition={{
                opacity: {
                  type: "timing",
                  duration: 600,
                },
                translateY: {
                  type: "timing",
                  duration: 600,
                  easing: Easing.out(Easing.back(1.8)),
                },
              }}
            >
              {modalContent}
            </MotiView>
          </View>
        </View>
      </>
    );
  }
);

export default FabWithTransitionToModal;
