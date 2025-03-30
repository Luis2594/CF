import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';
import { styles } from '@/styles/components/buttonIcon.styles';

interface ButtonIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  ref?: React.RefObject<TouchableOpacity>;
}

const ButtonIcon: React.FC<ButtonIconProps> = React.forwardRef(({
  icon: Icon,
  size = 20,
  color = "#666",
  style,
  onPress,
  disabled = false
}, ref) => {
  return (
    <TouchableOpacity
      ref={ref as React.RefObject<TouchableOpacity>}
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Icon size={size} color={color} />
    </TouchableOpacity>
  );
});

export default ButtonIcon;