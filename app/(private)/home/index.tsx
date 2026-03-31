import { Colors } from '@/constants/colors'
import { View, StyleSheet, TextInput, FlatList } from 'react-native'
import { typography } from '@/constants/typography'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState, useMemo, useRef, useEffect } from 'react'
import stockData from '@/assets/withLogoBlurHash.min.json'
import StockItem from '@/components/StockItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSQLiteContext } from 'expo-sqlite'
import StockvestHeader from '@/components/StockvestHeader'
import PillContainer from '@/components/PillContainer'
import { listToUUID, UUIDToItem } from '@/utils/UUID'
const stockFilters = ['Trending', 'Top Gainers', 'Top Losers', 'Most Active', 'Watchlist']

const Home = () => {
  const db = useSQLiteContext();

  const [search, setSearch] = useState('');
  const [pill, setPill] = useState<string>('')
  const [filteredList, setFilteredList] = useState<typeof stockData>([])
  const list = useRef(listToUUID(stockFilters))

  const result = useMemo(() => {
    if (!search) return [];
    const reg = new RegExp(search, 'i');
    return stockData.filter((v) => reg.test(v.name) || reg.test(v.symbol));
  }, [search]);


  useEffect(() => {
    const runFilterUpdate = async () => {
      const stockFilter = UUIDToItem(pill, list.current)
      switch (stockFilter) {
        case 'Watchlist':
          setFilteredList(await db.getAllAsync<typeof stockData[number]>('SELECT * from watchlist'))
          break;
        default:
          break;
      }
    }
    runFilterUpdate()
  }, [pill, db])

  return (
    <SafeAreaView style={styles.container}>
      <StockvestHeader />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          onChangeText={setSearch}
          value={search}
          placeholder="Search stocks..."
        />
        <MaterialCommunityIcons name='magnify-remove-outline' style={styles.magnify} />
      </View>
      {search && <FlatList
        data={result}
        renderItem={({ item }) =>
          <StockItem {...item} />
        }
        contentContainerStyle={{ paddingVertical: typography.size.xs }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
      />}
      {!search && <View>
        <PillContainer pill={pill} setPill={setPill} list={list.current}

        />
        <FlatList
          data={filteredList}
          renderItem={({ item }) =>
            <StockItem {...item} />
          }
          contentContainerStyle={{ paddingVertical: typography.size.xs }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
        />
      </View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgPrimary,
    flex: 1,
    paddingHorizontal: typography.size.xxl
  },
  searchBar: {
    backgroundColor: Colors.bgSecondary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: Colors.textLight,
    marginTop: 10,
    paddingLeft: 46,
    fontSize: 20
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: typography.size.xs
  },
  magnify: {
    fontSize: typography.size.xxxl,
    color: Colors.textLight,
    position: 'absolute',
    top: 14,
    left: 10
  }
});

export default Home

// <LineChart
//   data={data}
//   yAxisThickness={0}
//   xAxisThickness={0}
//   hideYAxisText={true}
//   hideAxesAndRules
//   hideDataPoints
//   curved
//   curvature={0.05}
//   startFillColor={Colors.loss}
//   endFillColor={Colors.loss}
//   startOpacity={0.25}
//   endOpacity={0}
//   areaChart
//   color={Colors.loss}
//   spacing={5}
//   initialSpacing={0}
//   endSpacing={0}
// />
