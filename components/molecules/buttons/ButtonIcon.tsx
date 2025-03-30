import React, { forwardRef } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "@/styles/components/buttonIcon.styles";

// Update the Icon type to React.ReactNode to accept JSX elements
interface ButtonIconProps {
  Icon: React.ReactNode; // Accept any valid JSX element
  style?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
}

const ButtonIcon = forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonIconProps
>(({ Icon, style, onPress, disabled = false }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {/* Directly render the passed Icon element */}
      {Icon}
    </TouchableOpacity>
  );
});

export default ButtonIcon;
