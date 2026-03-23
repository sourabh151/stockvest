import { Colors } from '@/constants/colors'
import { View, Text } from 'react-native'
import { LineChart, lineDataItem } from 'react-native-gifted-charts'

const Home = () => {
  const data: lineDataItem[] = [{ value: 10 }, { value: 20 }, { value: 14 }, { value: 18 }, { value: 16 }, { value: 20 }, { value: 22 }, { value: 26 }, { value: 25 }, { value: 29 }, { value: 31 }, { value: 29 }, { value: 22 }, { value: 18 }, { value: 14 }, { value: 19 }, { value: 22 }, { value: 26 }, { value: 28 }, { value: 25 }, { value: 10 }, { value: 20 }, { value: 14 }, { value: 18 }, { value: 16 }, { value: 20 }, { value: 22 }, { value: 26 }, { value: 25 }, { value: 29 }, { value: 31 }, { value: 29 }, { value: 22 }, { value: 18 }, { value: 14 }, { value: 19 }, { value: 22 }, { value: 26 }, { value: 28 }, { value: 25 }, { value: 10 }, { value: 20 }, { value: 14 }, { value: 18 }, { value: 16 }, { value: 20 }, { value: 22 }, { value: 26 }, { value: 25 }, { value: 29 }, { value: 31 }, { value: 29 }, { value: 22 }, { value: 18 }, { value: 14 }, { value: 19 }, { value: 22 }, { value: 26 }, { value: 28 }, { value: 25 }, { value: 10 }, { value: 20 }, { value: 14 }, { value: 18 }, { value: 16 }, { value: 20 }, { value: 22 }, { value: 26 }, { value: 25 }, { value: 29 }, { value: 31 }, { value: 29 }, { value: 22 }, { value: 18 }, { value: 14 }, { value: 19 }, { value: 22 }, { value: 26 }, { value: 28 }, { value: 25 }, { value: 10 }, { value: 20 }, { value: 14 }, { value: 18 }, { value: 16 }, { value: 20 }, { value: 22 }, { value: 26 }, { value: 25 }, { value: 29 }, { value: 31 }, { value: 29 }, { value: 22 }, { value: 18 }, { value: 14 }, { value: 19 }, { value: 22 }, { value: 26 }, { value: 28 }, { value: 25 }, { value: 10 }, { value: 20 }, { value: 14 }, { value: 18 }, { value: 16 }, { value: 20 }, { value: 22 }, { value: 26 }, { value: 25 }, { value: 29 }, { value: 31 }, { value: 29 }, { value: 22 }, { value: 18 }, { value: 14 }, { value: 19 }, { value: 22 }, { value: 26 }, { value: 28 }, { value: 25 }]
  return (
    <View>
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
        startOpacity={0.4}
        endOpacity={0.1}
        areaChart
        color={Colors.loss}
        spacing={5}
      />
    </View>
  )
}

export default Home
