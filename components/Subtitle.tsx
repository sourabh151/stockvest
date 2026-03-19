
import { Colors } from '@/constants/colors'
import { typography } from '@/constants/typography'
import { FC } from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'

type subtitleProps = {
  key?: string,
  text: string,
  styleProp?: TextStyle
}
const Title: FC<subtitleProps> = ({ text, styleProp }) => {
  const hl = text.search('<hl>') > -1 ? true : false;
  let data: string[] = [];
  if (hl)
    data = text.split('<hl>')


  return (
    <Text style={[styles.sub, styleProp]}>
      {
        !hl && text
      }
      {
        hl && data[0]
      }
      {
        hl && <Text style={styles.highlight}>{data[1]}</Text>
      }
      {
        hl && data[2]
      }
    </Text>
  )
}

const styles = StyleSheet.create({
  sub: {
    color: Colors.textLight,
    fontSize: typography.size.sm,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: typography.weight.medium,
    color: Colors.textDark
  }
});

export default Title
