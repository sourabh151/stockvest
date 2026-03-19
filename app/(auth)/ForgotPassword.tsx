import Title from '@/components/Title';
import { Colors } from '@/constants/colors';
import { StyleSheet, Keyboard } from 'react-native'
import Subtitle from '@/components/Subtitle'
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { typography } from '@/constants/typography';
import { isEmailValid } from '@/utils/checkEmail';


const ForgotPassword = () => {
  const [email, setEmail] = useState<string | undefined>();
  const router = useRouter()
  const handlePress = () => {
    if (email && isEmailValid(email)) {
      Keyboard.dismiss()
      router.push(`/(auth)/${email}`)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Title text=' Forgot Password' />
      <Subtitle text='Insert your registered email below to receive password reset instruction' />
      <CustomInput text='Email' textContentType='emailAddress' style={{ marginTop: typography.size.xxxl }} onChangeText={setEmail} error={!isEmailValid(email)} />
      <CustomButton text='Send' handlePress={handlePress} styleProp={{ marginTop: typography.size.lg }} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgPrimary,
    flex: 1,
    paddingHorizontal: typography.size.xxl
  },
});

export default ForgotPassword
