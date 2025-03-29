import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { styles } from '@/styles/components/filterModal.styles';
import { SVG } from '@/constants/assets';

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
}

export default function FilterModal({
  visible,
  onClose,
  onSelect,
  selectedOption,
  options,
}: FilterModalProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -200,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
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
                  opacity: fadeAnim,
                  transform: [{ translateX: slideAnim }],
                }
              ]}
            >
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <SVG.CLOSE_SECOND width={20} height={20} />
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <View style={styles.optionsContainer}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      selectedOption === option.id && styles.selectedOption,
                    ]}
                    onPress={() => {
                      onSelect(option.id);
                      onClose();
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedOption === option.id && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {selectedOption === option.id && (
                      <View style={styles.checkIcon}>
                        <SVG.CHECK width={12} height={12} />
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