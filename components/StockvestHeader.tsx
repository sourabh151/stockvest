import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors';

const StockvestHeader = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons style={styles.logo} name={'candlestick-chart'} />
      <Text style={styles.stockvest}>Stockvest</Text>
      <View style={styles.circle} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    position: 'relative',
    zIndex: 2
  },
  logo: {
    color: Colors.textDark,
    fontWeight: 700,
    fontSize: 30
  },
  stockvest: {
    fontSize: 24,
    fontWeight: 500
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
  }
});


export default StockvestHeader
