import { Colors } from '@/constants/colors'
import { typography } from '@/constants/typography';
import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {
  text?: string,
  error?: boolean
}

const CustomInput: FC<InputProps> = ({ text, style, error, ...otherProps }) => {
  return (
    <TextInput
      style={[styles.input, style, error ? styles.error : {}]}
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
    paddingHorizontal: typography.size.sm,
    borderRadius: typography.size.xs,
    fontSize: typography.size.lg,
    borderWidth: 1,
    borderColor: Colors.bgPrimary
  },
  error: {
    borderColor: Colors.loss
  }
});

export default CustomInput
