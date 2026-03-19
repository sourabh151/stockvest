import StockvestHeader from '@/components/StockvestHeader'
import { Colors } from '@/constants/colors'
import { typography } from '@/constants/typography'
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
            fontSize: typography.size.xxxl,
            paddingHorizontal: typography.size.lg,
            paddingTop: typography.size.xxl
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
