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
          }}
            onPress={() => props.navigation.pop()} /> : <></>}
          <StockvestHeader />
        </View>
      },
    }} >

      <Stack.Screen name='VerifyEmail' options={{
        presentation: 'formSheet',
        sheetAllowedDetents: [0.7],
        headerShown: false,
        sheetInitialDetentIndex: 0,
        sheetCornerRadius: 30,
        sheetGrabberVisible: true
      }} />
    </Stack>
  )
}

export default RootLayout
