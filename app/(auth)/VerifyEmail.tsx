import CustomButton from '@/components/CustomButton';
import Title from '@/components/Title';
import { Colors } from '@/constants/colors';
import { View, Image, StyleSheet } from 'react-native'
import Subtitle from '@/components/Subtitle'

const VerifyEmail = () => {
  const handleResend = () => console.log('resent');

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/stockvest_bg.jpg')} style={styles.bg} />
      <Title text='Verify Email' />
      <Subtitle text='An Email has been sent to your email <hl>jhamnaniSourabh2@gmail.com<hl>.please click on the link to verify your email.' />
      <CustomButton text='Resend Email' handlePress={handleResend} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: Colors.bgPrimary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  bg: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    paddingTop: 10
  }
});


export default VerifyEmail
