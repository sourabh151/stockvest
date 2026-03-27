import { Colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const StockDetails = () => {
  const [favourite, setFavourite] = useState(false)
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons style={styles.logo} name={'chevron-left'} />
        </TouchableOpacity>
        <View style={styles.right} >
          <MaterialIcons name='punch-clock' style={[styles.logo, styles.clock]} />
          <TouchableOpacity onPress={() => setFavourite(!favourite)}>
            <MaterialIcons name='star' style={[styles.logo, favourite ? styles.favourite : styles.star]} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: typography.size.xxl,
    backgroundColor: Colors.bgPrimary,
    flex: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    justifyContent: 'space-between',
    backgroundColor: Colors.bgPrimary,
    paddingVertical: typography.size.lg,
  },
  logo: {
    color: Colors.textDark,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.xxl
  },
  star: {
    color: Colors.textLight
  },
  right: {
    flexDirection: 'row',
    gap: 10
  },
  clock: {

  },
  favourite: {
    color: Colors.accent
  },

});


<Text></Text>
export default StockDetails
