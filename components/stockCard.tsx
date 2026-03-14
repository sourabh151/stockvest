import { Colors } from '@/constants/colors';
import { View, Text, StyleSheet, Image } from 'react-native'

const stockCard = () => {
  return (
    <View style={styles.container}>
      <Image />
      <Text></Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {

    backgroundColor: Colors.bgPrimary,
    borderWidth: 1,
    borderRadius: 2,
    elevation: 5,
    padding: 50,
    width: 100,
    height: 200,
    display: 'flex',
    flexDirection: 'column'
  },
});


export default stockCard
