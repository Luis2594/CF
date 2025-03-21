import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  Animated,
  LayoutChangeEvent,
  ViewStyle,
  TextStyle,
  Platform,
  StatusBar,
} from "react-native";
import { ChevronDown, ChevronUp, Check } from "lucide-react-native";
import { styles } from "@/styles/components/dropdown.styles";

type DropdownItem = {
  value: string;
  label: string;
};

type DropdownProps = {
  items: DropdownItem[];
  selectedValue: string;
  onSelect: (item: DropdownItem) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  textStyle?: TextStyle;
  itemTextStyle?: TextStyle;
  selectedItemTextStyle?: TextStyle;
  selectedItemStyle?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  zIndex?: number;
  required?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedValue,
  onSelect,
  placeholder = "Seleccionar",
  containerStyle,
  dropdownStyle,
  textStyle,
  itemTextStyle,
  selectedItemTextStyle,
  selectedItemStyle,
  label,
  labelStyle,
  zIndex = 1000,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [dropdownLayout, setDropdownLayout] = useState({
    width: 0,
    height: 0,
  });
  const [direction, setDirection] = useState<"down" | "up">("down");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dropdownRef = useRef<View>(null);
  const windowHeight = Dimensions.get("window").height;

  const selectedItem = items.find((item) => item.value === selectedValue);

  const toggleDropdown = () => {
    if (visible) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        // Calculate if there's enough space below
        const spaceBelow = windowHeight - pageY - height;
        const spaceNeeded = Math.min(items.length * 50, 200); // Estimate dropdown height

        // Determine if dropdown should open upward or downward
        const shouldOpenUpward =
          spaceBelow < spaceNeeded && pageY > spaceNeeded;

        setDirection(shouldOpenUpward ? "up" : "down");
        setDropdownPosition({
          top: pageY + (shouldOpenUpward ? 0 : height),
          left: pageX,
          width: width,
          height: height,
        });

        setVisible(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const closeDropdown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const handleSelect = (item: DropdownItem) => {
    onSelect(item);
    closeDropdown();
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setDropdownLayout((prev) => ({ ...prev, height }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const backHandler = () => {
      if (visible) {
        closeDropdown();
        return true;
      }
      return false;
    };

    // For web, add a document click listener
    if (Platform.OS === "web") {
      const handleDocumentClick = (e: MouseEvent) => {
        if (visible && dropdownRef.current && e.target) {
          closeDropdown();
        }
      };

      document.addEventListener("click", handleDocumentClick);
      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
    }

    return () => {};
  }, [visible]);

  const renderItem = ({ item }: { item: DropdownItem }) => (
    <TouchableOpacity
      style={[styles.item, item.value === selectedValue && selectedItemStyle]}
      onPress={() => handleSelect(item)}
    >
      <Text
        style={[
          styles.itemText,
          itemTextStyle,
          item.value === selectedValue && selectedItemTextStyle,
        ]}
      >
        {item.label}
      </Text>
      {item.value === selectedValue && <Check size={20} color="#F04E23" />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}

      <TouchableOpacity
        ref={dropdownRef}
        style={[styles.dropdown, dropdownStyle]}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.text, !selectedValue && styles.placeholder, textStyle]}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        {visible ? (
          <ChevronUp size={20} color="#666" />
        ) : (
          <ChevronDown size={20} color="#666" />
        )}
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={0}
          onPress={closeDropdown}
        >
          <Animated.View
            style={[
              styles.dropdownList,
              {
                top:
                  direction === "down"
                    ? dropdownPosition.top - (StatusBar.currentHeight ?? 0)
                    : dropdownPosition.top - dropdownLayout.height,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                opacity: fadeAnim,
                maxHeight: 200,
                zIndex,
              },
            ]}
            onLayout={handleLayout}
          >
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;
