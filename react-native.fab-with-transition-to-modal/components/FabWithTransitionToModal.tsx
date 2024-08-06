import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { BlurView } from "expo-blur";

type Props = {
  collapsedSize: number;
  fabContent?: React.ReactNode;
  modalContent: React.ReactNode;
  screenEdgeOffset: number;
};

export type FabWithTransitionToModalRef = {
  collapse: () => void;
  expand: () => void;
};

const FabWithTransitionToModal = forwardRef<FabWithTransitionToModalRef, Props>(
  function (
    { collapsedSize, fabContent, modalContent, screenEdgeOffset },
    ref
  ) {
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
                {Platform.OS === "ios" ? (
                  <BlurView intensity={10} style={{ flex: 1 }} />
                ) : (
                  <View
                    style={{ flex: 1, backgroundColor: "gray", opacity: 0.8 }}
                  />
                )}
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
              borderRadius: isExpanded ? 24 : 16,
              width: isExpanded ? expandedWidth : collapsedSize,
              height: isExpanded ? modalContentHeight : collapsedSize,
            }}
            transition={{
              type: "timing",
              duration: 300,
            }}
            style={{
              backgroundColor: "black",
            }}
          >
            <Pressable
              pointerEvents={isExpanded ? "none" : "auto"}
              style={{ flex: 1 }}
              onPress={expand}
            />
          </MotiView>
          {fabContent && (
            <MotiView
              animate={{
                opacity: isExpanded ? 0 : 1,
              }}
              transition={{
                duration: 150,
              }}
              pointerEvents="none"
              style={{
                position: "absolute",
                bottom: 0,
                width: collapsedSize,
                height: collapsedSize,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {fabContent}
            </MotiView>
          )}
          <View
            pointerEvents={isExpanded ? "auto" : "none"}
            style={{
              position: "absolute",
              width: expandedWidth,
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
              onLayout={({ nativeEvent }) => {
                setModalContentHeight(nativeEvent.layout.height);
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
