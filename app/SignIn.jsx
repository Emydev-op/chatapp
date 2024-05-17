import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/CustomKeyboardView";

export default function SignIn() {
  const router = useRouter();
  const emaiRef = useRef("");
  const PasswordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!emaiRef.current || !PasswordRef.current) {
      Alert.alert("Sign In", "Please fill all the fields");
      return;
    }
    //Login Process
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        className="flex-1 space-y-12"
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            source={require("../assets/images/react-logo.png")}
            style={{ height: hp(25) }}
            resizeMode="contain"
          />
        </View>
        <View className="space-y-8">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign In
          </Text>
          {/* Input */}
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row space-x-4 px-4 bg-neutral-100 justify-center items-center rounded-xl"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                style={{ fontSize: hp(2.4), height: "100%" }}
                className="flex-1 font-semibold text-neutral-700"
                onChangeText={(value) => (emaiRef.current = value)}
                placeholder="Email Address"
                placeholderTextColor="gray"
              />
            </View>
            <View className="gap-y-3">
              <View
                style={{ height: hp(7) }}
                className="flex-row space-x-4 px-4 bg-neutral-100 items-center rounded-xl"
              >
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  style={{ fontSize: hp(2.4) }}
                  secureTextEntry
                  onChangeText={(value) => (PasswordRef.current = value)}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Password"
                  placeholderTextColor="gray"
                />
              </View>
              <Text
                className="font-semibold text-right text-neutral-500 "
                style={{ fontSize: hp(1.8) }}
              >
                Forgot Password?
              </Text>
            </View>
            {/* Button */}
            <View>
              {isLoading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{ height: hp(6.5) }}
                  className="bg-indigo-500 rounded-xl justify-center items-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* Signup text */}
            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Don't have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("SignUp")}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
