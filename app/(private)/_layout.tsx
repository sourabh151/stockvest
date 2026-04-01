import { Colors } from '@/constants/colors'
import { typography } from '@/constants/typography'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite'
import { StyleSheet } from 'react-native'

const RootLayout = () => {
  return (
    <SQLiteProvider databaseName="stockvest.db" onInit={migrateDBIfNeeded}>
      <Tabs
        initialRouteName='home'
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: Colors.bgPrimary,
            height: 60,
            paddingTop: typography.size.xs,
            paddingBottom: typography.size.sm,
            borderTopWidth: 0,
          },
          headerShown: false
        }} >
        <Tabs.Screen name='home' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'home-variant-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
        <Tabs.Screen name='Portfolio' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'star-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
        <Tabs.Screen name='Profile' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'chart-pie-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
        <Tabs.Screen name='Transactions' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'clipboard-text-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
        <Tabs.Screen name='Watchlist' options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={'account-outline'} style={[styles.icon, focused ? styles.focused : {}]} /> }} />
      </Tabs>
    </SQLiteProvider>

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
async function migrateDBIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');
  let user_version = result?.user_version ?? 0;

  if (user_version >= DATABASE_VERSION)
    return

  if (user_version === 0) {
    await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    blurhash TEXT,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL,
    type TEXT CHECK(type IN ('BUY', 'SELL')) NOT NULL,
    quantity REAL NOT NULL,
    price_per_share_int INTEGER NOT NULL,
    brokerage_int INTEGER DEFAULT 0,
    trade_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS portfolio (
    symbol TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    blurhash TEXT,
    total_quantity REAL NOT NULL DEFAULT 0,
    avg_buy_price_int INTEGER NOT NULL DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);
PRAGMA user_version = ${DATABASE_VERSION};
`)
  }
}
//home watchlist portfolio transaction profile
