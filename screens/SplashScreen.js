import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const SplashScreenScreen = () => {
  useEffect(() => {
    async function prepareResources() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Load necessary resources here (e.g., fonts, data)
        // For example: await Font.loadAsync({...});
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn(error);
      }
    }
    prepareResources();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../img/littleLemonLogo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: "90%",
    resizeMode: "contain",
  },
});

export default SplashScreenScreen;
