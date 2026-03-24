import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen name='[symbol]' options={{ title: 'Stock Details' }} />
    </Stack>
  )
}

export default RootLayout
