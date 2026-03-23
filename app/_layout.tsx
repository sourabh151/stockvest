import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useEffect } from "react";
import { useUserStore } from "@/storage/userStorage";

export default function RootLayout() {
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '349860239347-ir2q1so6um2s8sjv1ebv6aal631bd7tq.apps.googleusercontent.com',
      webClientId: '349860239347-3m0ub8hihlu1qlgun2mbo90jt2t3rt4o.apps.googleusercontent.com',
    })
  })
  const verified = useUserStore((s) => s.verified)

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!verified} >
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={verified} >
          <Stack.Screen name="(private)" />
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>
  );
}
