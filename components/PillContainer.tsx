import { listToUUID } from '@/utils/UUID';
import { FC, SetStateAction, Dispatch, useEffect } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native'
import Pill from './Pill';
interface PillContainerProps extends ViewProps {
  pill: string,
  setPill: Dispatch<SetStateAction<string>>,
  list: ReturnType<typeof listToUUID>
}

const PillContainer: FC<PillContainerProps> = ({ list, setPill, pill }) => {
  useEffect(() => {
    if (!pill) {
      setPill(list[0].UUID)
    }
  })
  return (
    <View style={styles.container}>
      {
        list.map(({ item, UUID }) => {
          return <Pill key={UUID} setPill={setPill} activePill={pill} pillId={UUID} text={item} />
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
});

export default PillContainer
