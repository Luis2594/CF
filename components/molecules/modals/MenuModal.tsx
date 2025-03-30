import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { styles } from "@/styles/components/menuModal.styles";
import { SVG } from "@/constants/assets";

interface Option {
  id: string;
  label: string;
  onPress: () => void;
}

interface SignOutModalProps {
  visible: boolean;
  options: Option[];
  menuRef: React.RefObject<View>;
  onClose: () => void;
}

export default function SignOutModal({
  visible,
  options,
  menuRef,
  onClose,
}: SignOutModalProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get("window").height;
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  });
  const [direction, setDirection] = useState<"down" | "up">("down");

  useEffect(() => {
    if (visible && menuRef.current) {
      menuRef.current.measure((x, y, width, height, pageX, pageY) => {
        const spaceBelow = windowHeight - pageY - height;
        const spaceNeeded = Math.min(options.length * 50, 200);
        const shouldOpenUpward =
          spaceBelow < spaceNeeded && pageY > spaceNeeded;

        setDirection(shouldOpenUpward ? "up" : "down");
        setDropdownPosition({
          top: pageY + (shouldOpenUpward ? 0 : height),
          left: pageX,
          right: 0,
          width,
          height,
        });
      });
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.content,
                {
                  top:
                    direction === "down"
                      ? dropdownPosition.top - (StatusBar.currentHeight ?? 0)
                      : dropdownPosition.top - 200,
                  right: dropdownPosition.right,
                  left: dropdownPosition.left,
                  opacity: fadeAnim,
                  zIndex: 1000,
                },
              ]}
            >
              <View style={styles.optionsContainer}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.optionButton}
                    onPress={() => {
                      option.onPress();
                    }}
                  >
                    <View style={styles.wrapItem}>
                      <SVG.SIGN_OUT width={24} height={24} />
                      <Text style={styles.optionText}>{option.label}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
