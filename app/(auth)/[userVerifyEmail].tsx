import CustomButton from '@/components/CustomButton';
import Title from '@/components/Title';
import { Image, StyleSheet } from 'react-native'
import Subtitle from '@/components/Subtitle'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { useLocalSearchParams } from 'expo-router/build/hooks';

const VerifyEmail = () => {
  const { userVerifyEmail } = useLocalSearchParams()

  const handleResend = () => console.log('resent');

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('@/assets/images/stockvest_bg.jpg')} style={styles.bg} />
      <Title text='Verify Email' />
      <Subtitle text={'An Email has been sent to your email <hl>' + userVerifyEmail + '<hl>.please click on the link to verify your email.'} />
      <CustomButton text='Resend Email' handlePress={handleResend} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 30,
    overflow: 'hidden',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.bgPrimary
  },
  bg: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    paddingTop: 10
  }
});

export default VerifyEmail
