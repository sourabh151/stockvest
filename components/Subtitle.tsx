
import { Colors } from '@/constants/colors'
import { FC } from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'

type subtitleProps = {
  key?: string,
  text: string,
  styleProp?: TextStyle
}
const Title: FC<subtitleProps> = ({ text, styleProp }) => {
  return (
    <Text style={[styles.sub, styleProp]}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  sub: {
    color: Colors.textLight,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10
  },
});

export default Title
