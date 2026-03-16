import { Colors } from '@/constants/colors'
import { FC } from 'react'
import { StyleSheet, TextInput, TextInputIOSProps, TextStyle } from 'react-native'

type InputProps = {
  key?: string,
  text: string,
  textContentType?: TextInputIOSProps['textContentType'],
  styleProp?: TextStyle
}

const CustomInput: FC<InputProps> = ({ text, textContentType, styleProp }) => {
  return (
    <TextInput style={[styles.input, styleProp]} placeholder={text} placeholderTextColor={Colors.textLight} textContentType={textContentType} cursorColor={Colors.textDark} />
  )
}

const styles = StyleSheet.create({
  container: {

  },
  input: {
    backgroundColor: Colors.bgSecondary,
    padding: 15,
    borderRadius: 10,
    position: 'relative',
    fontSize: 20,
    marginBottom: 10
  },
});

export default CustomInput
