type dataType = {
  image: String,
  name: String,
  percent: String,
}
export const data: dataType[] = [
  {
    name: 'BBCA',
    image: require('@/assets/images/bbca.png'),
    percent: '+108.68%'
  },
  {
    name: 'UNVR',
    image: require('@/assets/images/unvr.png'),
    percent: '-54.49%'
  },
  {
    name: 'PTBA',
    image: require('@/assets/images/ptba.png'),
    percent: '+62.34%'
  },
  {
    name: 'SIDO',
    image: require('@/assets/images/sido.webp'),
    percent: '+198.39%'
  }
]
