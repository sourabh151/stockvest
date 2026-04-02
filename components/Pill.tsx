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
  Button: {
    paddingHorizontal: 12,
    paddingVertical: 8, // Increased paddingVertical
    borderRadius: 20, // More rounded for a pill shape
    backgroundColor: Colors.bgSecondary, // Default inactive background
  },
  activeButton: {
    backgroundColor: Colors.accent, // Active background
  },
  buttonLabel: {
    color: Colors.textDark, // Default inactive text color
    fontSize: typography.size.sm, // Slightly larger font
    fontWeight: typography.weight.semiBold, // Semi-bold for good readability
  },
  activeButtonLabel: {
    color: Colors.textDark, // Text color remains dark for contrast on accent background
  },
});

export default Pill
