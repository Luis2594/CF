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
import { styles } from "@/styles/components/filterModal.styles";
import { Check } from "lucide-react-native";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
  selectedOption: string;
  options: FilterOption[];
  anchorRef: React.RefObject<View>;
}

export default function FilterModal({
  visible,
  onClose,
  onSelect,
  selectedOption,
  options,
  anchorRef,
}: FilterModalProps) {
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
    if (visible && anchorRef.current) {
      anchorRef.current.measure((x, y, width, height, pageX, pageY) => {
        const screenWidth = Dimensions.get("window").width;
        const spaceBelow = windowHeight - pageY - height;
        const spaceNeeded = Math.min(options.length * 50, 200);
        const shouldOpenUpward =
          spaceBelow < spaceNeeded && pageY > spaceNeeded;

        setDirection(shouldOpenUpward ? "up" : "down");
        setDropdownPosition({
          top: pageY + (shouldOpenUpward ? 0 : height),
          left: pageX,
          right: screenWidth - (x + width),
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
                      onSelect(option.id);
                      onClose();
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedOption === option.id &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {selectedOption === option.id && (
                      <View style={styles.checkIcon}>
                        <Check size={20} color="#F04E23" />
                      </View>
                    )}
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
