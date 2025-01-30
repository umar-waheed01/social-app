import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { getUserImageSrc } from '../../services/ImageService';

const Avatar = ({ uri, size = 24, rounded = 50, style = {} }) => {
  return (
    <View>
      <Image 
        source={getUserImageSrc(uri)} 
        style={[styles.profileImage, style, { width: size, height: size, borderRadius: rounded }]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    borderWidth: 1,
    borderColor: 'darkgray',
  }
});

export default Avatar; // Default Export
