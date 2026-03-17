import Title from '@/components/Title';
import { Colors } from '@/constants/colors';
import { StyleSheet, Keyboard } from 'react-native'
import Subtitle from '@/components/Subtitle'
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/storage/userStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const email = useUserStore((state) => state.email);
  const router = useRouter()
  const handlePress = () => {
    if (email && emailRegexp.test(email)) {
      Keyboard.dismiss()
      router.push('/(auth)/VerifyEmail')
    }
  }
  useEffect(() => {
    const verified = useUserStore((state) => state.verified)
    if (!verified) {
      setUserInfo({ email: undefined })
    }
  }, [])
  const handleInput = (email: string) => {
    setUserInfo({ email });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Title text=' Forgot Password' />
      <Subtitle text='Insert your registered email below to receive password reset instruction' />
      <CustomInput text='Email' textContentType='emailAddress' style={{ marginTop: 40 }} onChangeText={handleInput} />
      <CustomButton text='Send' handlePress={handlePress} styleProp={{ marginTop: 20 }} />
    </SafeAreaView>
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
