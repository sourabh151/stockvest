import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import Subtitle from '@/components/Subtitle';
import Title from '@/components/Title';
import { Colors } from '@/constants/colors';
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
    router.push('/(auth)/Signup')
  }
  useEffect(() => {
    if (password != repeat) {
      setError(true)
    }
    else {
      setError(false)
    }
    console.log(error);

  }, [password, repeat])

  return (
    <SafeAreaView style={styles.container}>
      <Title text={"Signup"} />
      <View style={styles.inputContainer}>
        <CustomInput text={'Email'} textContentType='emailAddress' style={{ marginBottom: 10 }} value={email} onChangeText={setEmail} />
        <View>
          <TextInput style={[styles.input, error ? styles.error : {}]} textContentType='password' placeholder={'Password'} secureTextEntry={showPassword} value={password} onChangeText={setPassword} />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons name={showPassword ? "eye-outline" : "eye-lock-outline"} style={styles.eye} />
          </TouchableOpacity>
        </View>
        <Subtitle text='Minimum of 6 characters with numbers' styleProp={{ textAlign: 'left', marginBottom: 10 }} />
        <View>
          <TextInput style={[styles.input, error ? styles.error : {}]} textContentType='password' placeholder={'Confirm Password'} secureTextEntry={showRepeat} value={repeat} onChangeText={setRepeat} />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowRepeat(!showRepeat)}>
            <MaterialCommunityIcons name={showPassword ? "eye-outline" : "eye-lock-outline"} style={styles.eye} />
          </TouchableOpacity>
        </View>
        <Subtitle text='Minimum of 6 characters with numbers' styleProp={{ textAlign: 'left', marginBottom: 10 }} />
        <CustomButton text='Registration' handlePress={handleRegistration} styleProp={{ marginVertical: 10 }} />
        <CustomButton text='With Google' outlineOnly={true} handlePress={handleRegistration} >
          <Ionicons name='logo-google' color={Colors.loss} size={20} />
        </CustomButton>
        <Subtitle text="Already have an account" styleProp={{ marginTop: 20 }} />
        <CustomButton text='Login' outlineOnly={true} handlePress={handleLogin} styleProp={{ marginTop: 10 }} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.bgPrimary,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 20
  },
  input: {
    backgroundColor: Colors.bgSecondary,
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  eye: {
    fontSize: 20,
    color: Colors.textLight
  },
  eyeBtn: {
    position: 'absolute',
    right: 10,
    top: 17
  },
  forgotBtn: {
    alignSelf: 'flex-end'
  },
  forgot: {
    color: Colors.loss,
    fontSize: 18,
    fontWeight: 500
  },
  error: {
    borderColor: Colors.loss
  }
});

export default Signup
