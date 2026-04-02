import { listToUUID } from '@/utils/UUID';
import { FC, SetStateAction, Dispatch, useEffect } from 'react';
import { StyleSheet, ViewProps, ScrollView } from 'react-native'
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
    <ScrollView contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {
        list.map(({ item, UUID }) => {
          return <Pill key={UUID} setPill={setPill} activePill={pill} pillId={UUID} text={item} />
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginVertical: 10
  },
});

export default PillContainer
