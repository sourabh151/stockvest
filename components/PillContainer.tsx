import { FC, SetStateAction } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native'
interface PillContainerProps extends ViewProps {
  pill: string | null,
  setPill: React.Dispatch<SetStateAction<string | null>>,
}

const PillContainer: FC<PillContainerProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
});

export default PillContainer
