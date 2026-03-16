import SafeAreaComponent from "@/components/SafeAreaComponent";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return <SafeAreaProvider>
    <SafeAreaComponent>
      <StatusBar barStyle={"dark-content"} />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaComponent>
  </SafeAreaProvider>
}
