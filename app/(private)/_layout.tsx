import StockvestHeader from '@/components/StockvestHeader'
import { Colors } from '@/constants/colors'
import { typography } from '@/constants/typography'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { View, StyleSheet } from 'react-native'

const RootLayout = () => {
  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        header(props) {
          return <View style={
            {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.bgPrimary
            }
          }>
            <StockvestHeader />
          </View>
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.bgPrimary,
          height: 60,
          paddingTop: typography.size.xs,
          paddingBottom: typography.size.sm,
          borderTopWidth: 0,
        },
      }} >
      <Tabs.Screen name='home' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'home-variant-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
      <Tabs.Screen name='Portfolio' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'star-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
      <Tabs.Screen name='Profile' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'chart-pie-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
      <Tabs.Screen name='Transactions' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'clipboard-text-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
      <Tabs.Screen name='Watchlist' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'account-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
    </Tabs>
  )
}
const styles = StyleSheet.create({
  container: {

  },
  icon: {
    width: typography.size.xxl,
    height: typography.size.xxl,
    borderRadius: 10,
    color: Colors.textDark,
    fontSize: typography.size.xl,
    textAlign: 'center',
    paddingTop: 2
  },
  focused: {
    backgroundColor: Colors.textDark,
    color: Colors.accent
  }
});


export default RootLayout
//home watchlist portfolio transaction profile
