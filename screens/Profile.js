import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { validateEmail, validatePhoneNumber } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
    image: "",
  });
  const [discard, setDiscard] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const getProfile = await AsyncStorage.getItem("profile");
        setProfile(JSON.parse(getProfile));
        setDiscard(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [discard]);

  const { update, logout } = useContext(AuthContext);

  const updateProfile = (key, value) => {
    setProfile((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

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

  const isFormValid = () => {
    return (
      !validateName(profile.firstName) &&
      !validateName(profile.lastName) &&
      validateEmail(profile.email) &&
      validatePhoneNumber(profile.phoneNumber)
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      updateProfile("image", result.uri);
    }
  };

  const removeImage = () => {
    updateProfile("image", "");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      onLayout={onLayoutRootView}
    >
      {/* Your profile content */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Other styles here
});

export default Profile;
