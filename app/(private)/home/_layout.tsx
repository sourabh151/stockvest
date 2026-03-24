import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen name='[symbol]' options={{ title: 'Stock Details' }} />
    </Stack>
  )
}

export default RootLayout
