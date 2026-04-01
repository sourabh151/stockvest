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
import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { useSQLiteContext } from 'expo-sqlite'

type StockParams = {
  symbol: string,
  name: string,
  blurhash: string
}

const StockDetails = () => {
  const db = useSQLiteContext()
  const [favourite, setFavourite] = useState(false)
  const { name, symbol, blurhash } = useLocalSearchParams<StockParams>()
  const [timeframe, setTimeframe] = useState<timeframes>('daily');
  const [areaColor, setAreaColor] = useState(Colors.profit)
  const [delta, setDelta] = useState<{ valueDelta: number, percentDelta: number, deltaColor: string }>({ percentDelta: 0, valueDelta: 0, deltaColor: Colors.profit })
  let deltaColor = Colors.profit;
  const { data, isError, isLoading, error } = useQuery({
    queryKey: [symbol, timeframe],
    queryFn: () => fetchStockData(symbol, timeframe),
    staleTime: Infinity
  })
  const sections = 5;

  useEffect(() => {
    if (data && data.length > 0) {
      const t = data.length - 1
      const t2 = t - 1
      if (data[0] && data[t] && data[t2] && data[0].value !== undefined && data[t].value !== undefined && data[t2].value !== undefined) {
        const valueDelta = Number((data[t].value - data[t2].value).toFixed(2));
        const percentDelta = Number(((valueDelta / data[t2].value) * 100).toFixed(2));
        if (percentDelta < 0) {
          deltaColor = Colors.loss;
        }
        else {
          deltaColor = Colors.profit
        }
        setDelta({ valueDelta, percentDelta, deltaColor })

        if ((data[0].value - data[t].value) > 0)
          setAreaColor(Colors.loss)
        else
          setAreaColor(Colors.profit)
      }
    }
    if (db.getFirstSync('SELECT * FROM watchlist WHERE symbol = ?', symbol)) {
      setFavourite(true)
    }
  }, [data])
  const handleFavouriteToggle = async () => {

    setFavourite(!favourite);
    if (favourite) {
      await db.runAsync(`DELETE FROM watchlist WHERE symbol = ?`, symbol)
    }
    else {
      await db.runAsync(`INSERT INTO watchlist (symbol,name,blurhash) VALUES (?,?,?)`, symbol, name, blurhash)
    }
  }



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
          <TouchableOpacity onPress={() => handleFavouriteToggle()}>
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
        {isLoading && <Text style={styles.statusText}>Loading chart...</Text>}
        {isError && <Text style={styles.errorText}>Error loading chart: {error?.message}</Text>}
        {data && data.length > 0 && <View>
          <View style={styles.deltaContainer}>
            <Text style={[styles.price, { color: delta.deltaColor }]}>{data[data.length - 1].value?.toFixed(0)}</Text>
            <Text style={[styles.percentDelta, { color: delta.deltaColor }]}>{`${delta.valueDelta}(${delta.percentDelta})`}</Text>
          </View>
          <LineChart
            xAxisLabelTextStyle={{ width: 50, transform: [{ translateX: '-50%' }] }}
            data={data}
            hideDataPoints
            curved
            curvature={0.05}
            startFillColor={areaColor}
            startOpacity={0.25}
            endOpacity={0}
            areaChart
            color={areaColor}
            initialSpacing={0}
            endSpacing={0}
            noOfSections={sections}
            adjustToWidth
            pointerConfig={{
              pointerStripHeight: 160,
              pointerStripColor: 'lightgray',
              pointerStripWidth: 2,
              pointerColor: 'lightgray',
              radius: 6,
              pointerLabelWidth: 100,
              pointerLabelHeight: 90,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: true,
              pointerLabelComponent: (items: lineDataItem[]) => {
                return (
                  <View
                    style={{
                      height: 90,
                      width: 100,
                      justifyContent: 'center',
                      marginTop: -30,
                      marginLeft: -80,
                    }}>
                    <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white' }}>
                      <Text style={{ fontWeight: 'bold', textAlign: 'center', color: areaColor }}>
                        {'$' + items[0].value?.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                );
              },
            }}

          />
          <View style={styles.timeframeContainer}>
            {
              dailyValues.map((v) => {
                return <TouchableOpacity
                  key={v}
                  onPress={() => setTimeframe(v)}
                  style={[styles.timeframeButton, timeframe === v && styles.activeTimeframe]}
                >
                  <Text style={[styles.timeframeLabel, timeframe === v && styles.activeTimeframeLabel]}>{v.toUpperCase()}</Text>
                </TouchableOpacity>
              })
            }
          </View>
        </View>}
        {data && data.length === 0 && !isLoading && !isError && <Text style={styles.statusText}>No data available for this timeframe.</Text>}
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
  },
  statusText: {
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 20
  },
  errorText: {
    color: Colors.loss,
    textAlign: 'center',
    marginTop: 20
  },
  timeframeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  timeframeButton: {
    paddingInline: 8,
    borderRadius: 8,
    paddingVertical: 4
  },
  activeTimeframe: {
    backgroundColor: Colors.textDark
  },
  timeframeLabel: {
    color: Colors.textDark,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold
  },
  activeTimeframeLabel: {
    color: Colors.bgPrimary
  },
  deltaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 10,
    marginBottom: 10
  },
  price: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
  },
  percentDelta: {

  }
});


export default StockDetails
