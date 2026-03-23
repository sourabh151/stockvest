import { Colors } from '@/constants/colors'
import { typography } from '@/constants/typography'
import { FC, ReactNode } from 'react'
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TouchableOpacityProps } from 'react-native'


interface ButtonProps extends TouchableOpacityProps {
  text: string,
  key?: string,
  handlePress: () => void,
  styleProp?: ViewStyle,
  outlineOnly?: boolean,
  children?: ReactNode
}

const CustomButton: FC<ButtonProps> = ({ handlePress, text, styleProp, outlineOnly, children, ...otherProps }) => {

  return (
    <TouchableOpacity
      style={[styles.button,
        styleProp,
      outlineOnly ? styles.outline : {}]}
      onPress={handlePress}
      {...otherProps}>
      <Text style={styles.buttonText}>
        {children}
        {children && '    '}
        {text}
      </Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {

  },

  button: {
    paddingVertical: typography.size.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: typography.size.sm
  },
  buttonText: {
    color: Colors.textDark,
    fontWeight: typography.weight.medium,
    fontSize: typography.size.md,
  },
  outline: {
    backgroundColor: Colors.bgPrimary,
    borderWidth: 2,
    borderColor: Colors.accent
  }
});

export default CustomButton
