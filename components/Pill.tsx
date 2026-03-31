import { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface PillProps extends TouchableOpacityProps {
  togglePill: (pillId: string) => null,
  pillId: string,
  activePillId: string,
  text: string
}

const Pill: FC<PillProps> = ({ togglePill, pillId, activePillId, text }) => {
  const isActive = activePillId === pillId
  return (
    <TouchableOpacity onPress={() => togglePill(pillId)}>
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {

  },
});

export default Pill
