import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

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
    paddingVertical: typography.size.lg,
    flex: 1,
    paddingTop: typography.size.xxxl
  },
  logo: {
    color: Colors.textDark,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.xxl
  },
  stockvest: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.medium,
  },
  circle: {
    width: typography.size.xxl,
    height: typography.size.xxl,
    borderRadius: typography.size.xxl,
    backgroundColor: Colors.accent,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: typography.size.xs,
  }
});


export default StockvestHeader
