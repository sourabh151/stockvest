import Title from '@/components/Title';
import { Colors } from '@/constants/colors';
import { View, StyleSheet } from 'react-native'
import Subtitle from '@/components/Subtitle'
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';

const ForgotPassword = () => {
  const router = useRouter()
  const handlePress = () => {
    router.push('/(auth)/VerifyEmail')
  }
  return (
    <View style={styles.container}>
      <Title text=' Forgot Password' />
      <Subtitle text='Insert your registered email below to receive password reset instruction' />
      <CustomInput text='Email' textContentType='emailAddress' styleProp={{ marginTop: 40 }} />
      <CustomButton text='Send' handlePress={handlePress} styleProp={{ marginTop: 20 }} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgPrimary,
    flex: 1,
    paddingHorizontal: 30
  },
});


export default ForgotPassword
