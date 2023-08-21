import React, { useState, useRef, useContext, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import PagerView from "react-native-pager-view";
import Constants from "expo-constants";

import { AuthContext } from "../contexts/AuthContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Onboarding = () => {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");

  const viewPagerRef = useRef(PagerView);
  const { onboard } = useContext(AuthContext);

  // FONTS
  const [fontsLoaded] = useFonts({
    // Your font imports here
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      onLayout={onLayoutRootView}
    >
      {/* Your onboarding content */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  // Other styles here
});

export default Onboarding;
