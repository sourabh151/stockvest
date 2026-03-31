import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useEffect } from "react";
import { useUserStore } from "@/storage/userStorage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite'
import { dailyValues } from "@/utils/tiingoApi";

export default function RootLayout() {
  const verified = useUserStore((s) => s.verified)
  const queryClient = new QueryClient();
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '349860239347-ir2q1so6um2s8sjv1ebv6aal631bd7tq.apps.googleusercontent.com',
      webClientId: '349860239347-3m0ub8hihlu1qlgun2mbo90jt2t3rt4o.apps.googleusercontent.com',
    })
  })

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="stockvest.db" onInit={migrateDBIfNeeded}>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle={"dark-content"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!verified} >
              <Stack.Screen name="(auth)" />
            </Stack.Protected>
            <Stack.Protected guard={verified} >
              <Stack.Screen name="(private)" />
            </Stack.Protected>
          </Stack>
        </QueryClientProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
async function migrateDBIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version } = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version') || { user_version: 0 }
  if (user_version >= DATABASE_VERSION)
    return
  if (user_version === 0) {
    await db.execAsync(`PRAGMA journal_mode="wal";
CREATE TABLE IF NOT EXISTS watchlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    blurhash TEXT,
    target_price_int INTEGER, -- Store as integer (e.g., 15075)
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
);`)

    await db.execAsync(`PRAGMA user_version=${DATABASE_VERSION}`)
  }
}
