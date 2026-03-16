import { Colors } from '@/constants/colors';
import { stockCardDataType } from '@/constants/onboardingData';
import { View, Text, StyleSheet, Image } from 'react-native'
type StockCardProps = {
  data: stockCardDataType,
  key: string,
  top: number,
  left: number
}

const StockCard: React.FC<StockCardProps> = ({ data, top, left }) => {
  const profit = data.percent.charCodeAt(0) === 43
  return (
    <View style={[styles.container, { transform: [{ translateX: left }, { translateY: top }] }]}>
      <Image source={data.image} style={styles.image} />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={[styles.percent, {
        color: profit ? Colors.profit : Colors.loss
      }]}>{data.percent}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgPrimary,
    borderRadius: 5,
    elevation: 3,
    padding: 20,
    width: 100,
    height: 120,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'contain',
    borderRadius: 100
  },
  title: {
    color: Colors.textDark,
    fontSize: 14,
    fontWeight: 400
  },
  percent: {
    fontSize: 12
  }
});


export default StockCard
