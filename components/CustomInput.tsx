import { Colors } from '@/constants/colors'
import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {
  text?: string;
}

const CustomInput: FC<InputProps> = ({ text, style, ...otherProps }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={text || otherProps.placeholder}
      placeholderTextColor={Colors.textLight}
      cursorColor={Colors.textDark}
      {...otherProps}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.bgSecondary,
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
  },
});

export default CustomInput
