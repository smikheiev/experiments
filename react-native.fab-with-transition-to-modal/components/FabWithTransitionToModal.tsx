import {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
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
import { LinearGradient } from "expo-linear-gradient";

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
        {<Backdrop isVisible={isExpanded} onPress={collapse} />}
        <View
          style={{
            position: "absolute",
            left: screenEdgeOffset,
            bottom: screenEdgeOffset,
            overflow: "hidden",
          }}
        >
          <View pointerEvents={isExpanded ? "none" : "auto"}>
            <Background
              collapsedSize={collapsedSize}
              isExpanded={isExpanded}
              expandedHeight={modalContentHeight}
              expandedWidth={expandedWidth}
              onPress={expand}
            />
          </View>
          {fabContent && (
            <View
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
              <FabContent isVisible={isExpanded}>{fabContent}</FabContent>
            </View>
          )}
          <View
            pointerEvents={isExpanded ? "auto" : "none"}
            style={{
              position: "absolute",
              width: expandedWidth,
            }}
          >
            <ModalContent
              isVisible={isExpanded}
              onHeightChange={setModalContentHeight}
            >
              {modalContent}
            </ModalContent>
          </View>
        </View>
      </>
    );
  }
);

function Backdrop({
  isVisible,
  onPress,
}: {
  isVisible: boolean;
  onPress: () => void;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={StyleSheet.absoluteFill}
        >
          <Pressable style={{ flex: 1 }} onPress={onPress}>
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
  );
}

function Background({
  collapsedSize,
  expandedHeight,
  expandedWidth,
  isExpanded,
  onPress,
}: {
  collapsedSize: number;
  expandedHeight: number;
  expandedWidth: number;
  isExpanded: boolean;
  onPress: () => void;
}) {
  return (
    <MotiView
      animate={{
        borderRadius: isExpanded ? 24 : 16,
        width: isExpanded ? expandedWidth : collapsedSize,
        height: isExpanded ? expandedHeight : collapsedSize,
      }}
      transition={{
        type: "timing",
        duration: 300,
      }}
      style={{
        overflow: "hidden",
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={onPress}>
        <LinearGradient
          colors={["#000000", "#444444"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Pressable>
    </MotiView>
  );
}

function FabContent({
  children,
  isVisible,
}: PropsWithChildren<{ isVisible: boolean }>) {
  return (
    <MotiView
      animate={{
        opacity: isVisible ? 0 : 1,
      }}
      transition={{
        duration: 150,
      }}
    >
      {children}
    </MotiView>
  );
}

function ModalContent({
  children,
  isVisible,
  onHeightChange,
}: PropsWithChildren<{
  isVisible: boolean;
  onHeightChange: (height: number) => void;
}>) {
  return (
    <MotiView
      animate={{
        opacity: isVisible ? 1 : 0,
        translateY: isVisible ? 0 : 100,
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
        onHeightChange(nativeEvent.layout.height);
      }}
    >
      {children}
    </MotiView>
  );
}

export default FabWithTransitionToModal;
