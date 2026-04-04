import { Colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { FC } from 'react';
import { Text, StyleSheet, TouchableOpacityProps, TouchableOpacity } from 'react-native'
interface TransactionButtonProps extends TouchableOpacityProps {
  buttonType: 'Sell' | 'Buy'
}

const TransactionButton: FC<TransactionButtonProps> = ({ buttonType }) => {
  const profit = buttonType === 'Buy';
  return (
    <TouchableOpacity style={[styles.container, profit ? styles.profit : styles.loss]}>
      <Text style={[styles.text, profit ? styles.profitText : styles.lossText]}>{buttonType}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: typography.size.lg,
    borderRadius: typography.size.sm,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium
  },
  profit: {
    backgroundColor: Colors.accent
  },
  loss: {
    backgroundColor: Colors.loss
  },
  profitText: {
    color: Colors.textDark
  },
  lossText: {
    color: Colors.bgPrimary
  }
});


export default TransactionButton
