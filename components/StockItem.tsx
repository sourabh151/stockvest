import { Colors } from '@/constants/colors'
import { typography } from '@/constants/typography'
import { useRouter } from 'expo-router'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

type StockItemProps = {
  name: string,
  symbol: string
}

const StockItem = ({ name, symbol }: StockItemProps) => {
  const router = useRouter()
  const handlePress = () => {
    router.push(`(private)/home/${symbol}`)
  }
  return (
    <TouchableOpacity key={symbol} style={styles.resultItem} onPress={handlePress}>
      <Image
        source={{ uri: `${process.env.EXPO_PUBLIC_LOGO_URL}${symbol}.png` }}
        style={styles.logo}
      />
      <View style={styles.text}>
        <Text style={styles.title}>{symbol}</Text>
        <Text style={styles.sub}>{name}</Text>
      </View>
      <View>

      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10
  },
  logo: {
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
  }

});

export default StockItem
