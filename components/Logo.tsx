import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { IMAGES } from '../constants/assets';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
};

export default function Logo({ size = 'medium' }: LogoProps) {
  const logoSize = size === 'small' ? 30 : size === 'medium' ? 50 : 70;
  const textSize = size === 'small' ? 20 : size === 'medium' ? 32 : 42;

  return (
    <View style={styles.logoWrapper}>
      <Image 
        source={{ uri: IMAGES.LOGO_PLACEHOLDER }}
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