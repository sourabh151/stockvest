import { Colors } from '@/constants/colors'
import { typography } from '@/constants/typography'
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
    fontWeight: typography.weight.semiBold,
    fontSize: typography.size.xxl,
    color: Colors.textDark,
    marginTop: typography.size.xl,
    marginBottom: typography.size.xs,
    textAlign: 'center',
  },

});

export default Title
