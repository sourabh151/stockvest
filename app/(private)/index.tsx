import { Colors } from '@/constants/colors'
import { View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { data } from '@/data'

const Home = () => {
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
