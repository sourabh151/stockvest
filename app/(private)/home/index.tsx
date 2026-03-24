import { Colors } from '@/constants/colors'
import { View, StyleSheet, TextInput, ScrollView, Text } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { data } from '@/data'
import { typography } from '@/constants/typography'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import stockData from '@/assets/without_logo.min.json'

type resultType = {
  name: string,
  symbol: string
}
const Home = () => {
  const [search, setSearch] = useState('');
  let result: resultType[] = []
  useEffect(() => {
    if (search) {
      const reg = new RegExp('$' + search, 'i')
      result = stockData.filter((v) => {
        return reg.test(v.name) || reg.test(v.symbol)
      })
      console.log(result);

    }
    return () => {
      return
    }
  }, [search])

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} onChangeText={setSearch}>
        <MaterialCommunityIcons name='magnify-plus-outline' style={styles.magnify} />
      </TextInput>
      <LineChart
        data={data}
        yAxisThickness={0}
        xAxisThickness={0}
        hideYAxisText={true}
        hideAxesAndRules
        hideDataPoints
        curved
        curvature={0.05}
        startFillColor={Colors.loss}
        endFillColor={Colors.loss}
        startOpacity={0.25}
        endOpacity={0}
        areaChart
        color={Colors.loss}
        spacing={5}
        initialSpacing={0}
        endSpacing={0}
      />
      <ScrollView>
        {result.map((v) => {
          return <Text key={v.symbol}>{v.name}</Text>
        })}
      </ScrollView>
    </View>
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
    paddingVertical: 5,
  },
  magnify: {
    fontSize: typography.size.xxxl,
    color: Colors.textLight
  }
});

export default Home

