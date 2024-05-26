import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle, SvgUri } from 'react-native-svg';

export const AnimatedSVGWithAnimation = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
      <SvgUri
        width="100%"
        height="100%"
        uri={'@/assets/images/logo.svg'}
      />
      </Animated.View>
    </View>
  );
};

export default AnimatedSVGWithAnimation;
