import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Loading({ size }) {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView source={require("../assets/loader/loader1.json")} style={{flex:1}} autoPlay loop />
    </View>
  );
}
