import StockvestHeader from '@/components/StockvestHeader'
import { Colors } from '@/constants/colors'
import { typography } from '@/constants/typography'
import { MaterialIcons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const RootLayout = () => {
  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        header(props) {
          return <View style={
            {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.bgPrimary,
            }
          }>
            {props.back ? <MaterialIcons name='chevron-left' style={{
              color: Colors.textDark,
              backgroundColor: Colors.bgPrimary,
              fontSize: typography.size.xxxl,
              paddingHorizontal: typography.size.lg,
              paddingTop: typography.size.xxl,
            }}
              onPress={() => props.navigation.pop()} /> : <></>}
            <StockvestHeader style={{
              marginTop: typography.size.lg,
            }} />
          </View>
        },
      }} >
      <Stack.Screen name='index' options={{ headerShown: true }} />
      <Stack.Screen name='[userVerifyEmail]' options={{
        presentation: 'formSheet',
        sheetAllowedDetents: [0.5, 0.7],
        headerShown: false,
        sheetInitialDetentIndex: 0,
        sheetCornerRadius: 30,
        contentStyle: { backgroundColor: Colors.bgPrimary }
      }} />
    </Stack>
  )
}

export default RootLayout
