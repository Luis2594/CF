import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
};

export default function Logo({ size = 'medium' }: LogoProps) {
  const logoSize = size === 'small' ? 30 : size === 'medium' ? 50 : 70;
  const textSize = size === 'small' ? 20 : size === 'medium' ? 32 : 42;

  return (
    <View style={styles.logoWrapper}>
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=200&auto=format&fit=crop' }}
        style={{ width: logoSize, height: logoSize, borderRadius: logoSize / 2 }}
      />
      <Text style={[styles.logoText, { fontSize: textSize }]}>FindForce</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '700',
    color: '#666',
    marginLeft: 10,
  },
});