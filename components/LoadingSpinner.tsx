// components/LoadingSpinner.tsx
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function LoadingSpinner() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.spinner, { transform: [{ rotate: spin }] }]}
      >
        🌀
      </Animated.Text>
      <Text style={styles.text}>Mencari data cuaca...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingVertical: 40 },
  spinner: { fontSize: 48, marginBottom: 12 },
  text: { fontSize: 16, color: "rgba(255,255,255,0.8)", fontWeight: "500" },
});
