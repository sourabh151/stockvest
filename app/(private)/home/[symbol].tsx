import { Colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import { dailyValues, fetchStockData, timeframes } from '@/utils/tiingoApi';
import { useQuery } from '@tanstack/react-query';
import { LineChart } from 'react-native-gifted-charts';

type StockParams = {
  symbol: string,
  name: string,
  blurhash: string
}

const StockDetails = () => {
  const [favourite, setFavourite] = useState(false)
  const { name, symbol, blurhash } = useLocalSearchParams<StockParams>()
  const [timeframe, setTimeframe] = useState<timeframes>('daily');
  const [areaColor, setAreaColor] = useState(Colors.profit)
  const { isLoading, isError, data } = useQuery({
    queryKey: [symbol, timeframe],
    queryFn: () => fetchStockData(symbol, timeframe),
    staleTime: Infinity
  })
  useEffect(() => {
    if (data) {
      const t = data.length - 1
      if (data[0].value && data[t].value) {
        if ((data[0].value - data[t].value) > 0)
          setAreaColor(Colors.loss)
        else
          setAreaColor(Colors.profit)
      }
    }
  }, [data])


  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons style={styles.logo} name={'chevron-left'} />
        </TouchableOpacity>
        <View style={styles.right} >
          <MaterialIcons name='punch-clock' style={[styles.logo, styles.clock]} />
          <TouchableOpacity onPress={() => setFavourite(!favourite)}>
            <MaterialIcons name='star' style={[styles.logo, favourite ? styles.favourite : styles.star]} />
          </TouchableOpacity>
        </View>
      </View>
      {/* body */}
      <View>
        <View key={symbol} style={styles.resultItem}>
          <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_LOGO_URL}${symbol}.png` }}
            style={styles.stockLogo}
            placeholder={{ blurhash }}
          />
          <View style={styles.text}>
            <Text style={styles.title}>{symbol}</Text>
            <Text style={styles.sub}>{name}</Text>
          </View>
        </View>
        {data && <View>
          <LineChart
            data={data}
            yAxisThickness={0}
            xAxisThickness={0}
            hideYAxisText
            hideAxesAndRules
            hideDataPoints
            curved
            curvature={0.05}
            startFillColor={areaColor}
            startOpacity={0.25}
            endOpacity={0}
            areaChart
            color={areaColor}
            spacing={5}
            initialSpacing={0}
            endSpacing={0}
          />
          <View>
            {
              dailyValues.map((v) => {
                return <TouchableOpacity key={v} onPress={() => setTimeframe(v)}>
                  <Text>{v}</Text>
                </TouchableOpacity>
              })
            }
          </View>
        </View>}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: typography.size.xxl,
    backgroundColor: Colors.bgPrimary,
    flex: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    justifyContent: 'space-between',
    backgroundColor: Colors.bgPrimary,
    paddingVertical: typography.size.lg,
  },
  logo: {
    color: Colors.textDark,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.xxl
  },
  star: {
    color: Colors.textLight
  },
  right: {
    flexDirection: 'row',
    gap: 10
  },
  clock: {

  },
  favourite: {
    color: Colors.accent
  },

  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10
  },
  stockLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text: {
    flex: 2
  },
  title: {
    color: Colors.textDark,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold
  },
  sub: {
    color: Colors.textLight,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular
  }
});


export default StockDetails
