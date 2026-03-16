import { Colors } from '@/constants/colors'
import { FC } from 'react'
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'

type ButtonProps = {
  text: string,
  key?: string,
  handlePress: () => void,
  styleProp?: ViewStyle
}

const CustomButton: FC<ButtonProps> = ({ handlePress, text, styleProp }) => {

  return (
    <TouchableOpacity style={[styles.button, styleProp]} onPress={handlePress}>
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
  }
});

export default CustomButton
