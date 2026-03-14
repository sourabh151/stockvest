import SafeAreaComponent from "@/components/SafeAreaComponent";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} >
    <SafeAreaComponent>
      <Stack.Screen name="index" />
    </SafeAreaComponent>
  </Stack>
}
