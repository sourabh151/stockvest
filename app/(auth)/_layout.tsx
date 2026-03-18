import StockvestHeader from '@/components/StockvestHeader'
import { Colors } from '@/constants/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const RootLayout = () => {
  return (
    <Stack screenOptions={{
      header(props) {
        return <View style={
          {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.bgPrimary
          }
        }>
          {props.back ? <MaterialIcons name='chevron-left' style={{
            color: Colors.textDark,
            backgroundColor: Colors.bgPrimary,
            fontSize: 36,
            paddingHorizontal: 20,
            paddingTop: 30
          }}
            onPress={() => props.navigation.pop()} /> : <></>}
          <StockvestHeader />
        </View>
      },
    }} >
      <Stack.Screen name='[userVerifyEmail]' options={{
        presentation: 'formSheet',
        sheetAllowedDetents: [0.5, 0.7],
        headerShown: false,
        sheetInitialDetentIndex: 0,
        sheetCornerRadius: 300,
        contentStyle: { backgroundColor: Colors.bgPrimary }
      }} />
    </Stack>
  )
}

export default RootLayout
