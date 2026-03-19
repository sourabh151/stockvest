import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import Subtitle from '@/components/Subtitle';
import Title from '@/components/Title';
import { Colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { isEmailValid } from '@/utils/checkEmail';
import { debounce } from '@/utils/debounce';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [email, setEmail] = useState<string | undefined>()
  const router = useRouter();
  const handleForgot = () => {
    router.push('/(auth)/ForgotPassword')
  }
  const handleLogin = () => { }
  const handleRegistration = () => {
    router.push('/(auth)/Signup')
  }
  return (
    <SafeAreaView style={styles.container}>
      <Title text={"Login"} />
      <View style={styles.inputContainer}>
        <CustomInput text={'Email'} textContentType='emailAddress' error={!isEmailValid(email)} onChangeText={setEmail} />
        <View>
          <TextInput style={styles.input} textContentType='password' placeholder={'Password'} secureTextEntry={showPassword} />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons name={showPassword ? "eye-outline" : "eye-lock-outline"} style={styles.eye} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotBtn} >
          <Text style={styles.forgot} onPress={debounce(handleForgot)}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <CustomButton text='Login' handlePress={debounce(handleLogin)} styleProp={{ marginTop: 20 }} />
        <Subtitle text="Don't have an account?" styleProp={{ marginTop: 20 }} />
        <CustomButton text='Registration' outlineOnly={true} handlePress={debounce(handleRegistration)} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: typography.size.xxl,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.bgPrimary,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: typography.size.sm,
    marginTop: typography.size.lg
  },
  input: {
    backgroundColor: Colors.bgSecondary,
    paddingHorizontal: typography.size.sm,
    borderRadius: typography.size.xs,
    fontSize: typography.size.lg,
    marginBottom: typography.size.xs,
    borderWidth: 1,
    borderColor: Colors.bgPrimary
  },
  eye: {
    fontSize: typography.size.lg,
    color: Colors.textLight
  },
  eyeBtn: {
    position: 'absolute',
    right: typography.size.xs,
    top: typography.size.sm
  },
  forgotBtn: {
    alignSelf: 'flex-end'
  },
  forgot: {
    color: Colors.loss,
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium
  }
});

export default Login
