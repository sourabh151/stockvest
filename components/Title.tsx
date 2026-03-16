import { Colors } from '@/constants/colors'
import { FC } from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'

type titleProps = {
  key?: string,
  text: string,
  styleProp?: TextStyle
}
const Title: FC<titleProps> = ({ text, styleProp }) => {
  return (
    <Text style={[styles.text, styleProp]}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 600,
    fontSize: 30,
    color: Colors.textDark,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },

});

export default Title
