import { Colors } from '@/constants/colors'
import { FC } from 'react'
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'

type ButtonProps = {
  text: string,
  key?: string,
  handlePress: () => void,
  styleProp?: ViewStyle,
  outlineOnly?: boolean
}

const CustomButton: FC<ButtonProps> = ({ handlePress, text, styleProp, outlineOnly }) => {

  return (
    <TouchableOpacity
      style={[styles.button,
        styleProp,
      outlineOnly ? styles.outline : {}]}
      onPress={handlePress}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {

  },

  button: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 15
  },
  buttonText: {
    color: Colors.textDark,
    fontWeight: 500,
    fontSize: 18
  },
  outline: {
    backgroundColor: Colors.bgPrimary,
    borderWidth: 1
  }
});

export default CustomButton
