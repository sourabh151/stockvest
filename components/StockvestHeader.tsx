import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors';

const StockvestHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <MaterialIcons style={styles.logo} name={'candlestick-chart'} />
        <Text style={styles.stockvest}>
          Stockvest
        </Text>
        <View style={styles.circle} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
    justifyContent: 'center',
    backgroundColor: Colors.bgPrimary,
    paddingVertical: 20,
    flex: 1,
    paddingTop: 40
  },
  logo: {
    color: Colors.textDark,
    fontWeight: 700,
    fontSize: 30
  },
  stockvest: {
    fontSize: 24,
    fontWeight: 500,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  }
});


export default StockvestHeader
