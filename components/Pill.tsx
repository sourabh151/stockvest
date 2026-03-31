import { FC, Dispatch, SetStateAction } from 'react';
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface PillProps extends TouchableOpacityProps {
  setPill: Dispatch<SetStateAction<string>>,
  pillId: string,
  activePill: string,
  text: string
}

const Pill: FC<PillProps> = ({ setPill, pillId, activePill, text }) => {
  const isActive = activePill === pillId

  return (
    <TouchableOpacity onPress={() => setPill(pillId)} style={[styles.Button, isActive && styles.activeButton]}>
      <Text style={[styles.buttonLabel, isActive && styles.activeButtonLabel]}>{text}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {

  },
  Button: {
    paddingInline: 8,
    borderRadius: 8,
    paddingVertical: 4
  },
  activeButton: {
    backgroundColor: Colors.textDark
  },
  buttonLabel: {
    color: Colors.textDark,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold
  },
  activeButtonLabel: {
    color: Colors.bgPrimary
  },
});

export default Pill
