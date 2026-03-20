import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import Subtitle from '@/components/Subtitle';
import Title from '@/components/Title';
import { Colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [showRepeat, setShowRepeat] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeat, setRepeat] = useState<string>('');

  const [error, setError] = useState(false)
  const router = useRouter();
  const handleLogin = () => {
    router.dismiss()
  }
  const handleRegistration = () => {
    router.push('/(auth)/Otp')
  }
  useEffect(() => {
    if (password !== repeat) {
      setError(true)
    }
    else {
      setError(false)
    }
  }, [password, repeat, setError])

  return (
    <SafeAreaView style={styles.container}>
      <Title text={"Signup"} />
      <View style={styles.inputContainer}>
        <CustomInput text={'Email'} textContentType='emailAddress' value={email} onChangeText={setEmail} />
        <View>
          <TextInput style={[styles.input, error ? styles.error : {}]} textContentType='password' placeholder={'Password'} secureTextEntry={showPassword} value={password} onChangeText={setPassword} />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons name={showPassword ? "eye-outline" : "eye-lock-outline"} style={styles.eye} />
          </TouchableOpacity>
        </View>
        <Subtitle text='Minimum of 6 characters with numbers' styleProp={styles.Subtitle} />
        <View>
          <TextInput style={[styles.input, error ? styles.error : {}]} textContentType='password' placeholder={'Confirm Password'} secureTextEntry={showRepeat} value={repeat} onChangeText={setRepeat} />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowRepeat(!showRepeat)}>
            <MaterialCommunityIcons name={showPassword ? "eye-outline" : "eye-lock-outline"} style={styles.eye} />
          </TouchableOpacity>
        </View>
        <Subtitle text='Minimum of 6 characters with numbers' styleProp={styles.Subtitle} />
        <CustomButton text='Registration' handlePress={handleRegistration} styleProp={{ marginVertical: typography.size.xs }} />
        <CustomButton text='With Google' outlineOnly={true} handlePress={handleRegistration} >
          <Ionicons name='logo-google' color={Colors.loss} size={typography.size.lg} />
        </CustomButton>
        <Subtitle text="Already have an account" styleProp={styles.Subtitle} />
        <CustomButton text='Login' outlineOnly={true} handlePress={handleLogin} styleProp={{ marginTop: typography.size.xs }} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: typography.size.xxl,
    flex: 1,
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
    borderWidth: 1,
    borderColor: Colors.bgPrimary
  },
  Subtitle: {
    paddingHorizontal: typography.size.sm,
    textAlign: 'left',
    marginBottom: typography.size.xs
  }
  ,
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
  },
  error: {
    borderColor: Colors.loss
  }
});

export default Signup
