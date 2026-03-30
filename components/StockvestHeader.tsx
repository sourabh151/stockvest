import { View, Text, StyleSheet, ViewProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

const StockvestHeader = ({ style }: ViewProps) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialIcons style={styles.logo} name={'candlestick-chart'} />
      <View>
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
    flexDirection: 'row',
    gap: typography.size.xs,
  },
  logo: {
    color: Colors.textDark,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.xxl
  },
  stockvest: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.medium,
    position: 'relative',
  },
  circle: {
    width: typography.size.xxl,
    height: typography.size.xxl,
    borderRadius: typography.size.xxl,
    backgroundColor: Colors.accent,
    position: 'absolute',
    right: 0,
    zIndex: -1,
  },
  wrapper: {
    display: 'flex',
  }
});


export default StockvestHeader
