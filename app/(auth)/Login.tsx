import CustomInput from '@/components/CustomInput';
import Title from '@/components/Title';
import { Colors } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const router = useRouter();
  const handleForgot = () => {
    router.push('/(auth)/ForgotPassword')
  }
  return (
    <View style={styles.container}>
      <Title text={"Login"} />
      <View style={styles.inputContainer}>
        <CustomInput text={'Email'} textContentType='emailAddress' />
        <View>
          <TextInput style={styles.input} textContentType='password' placeholder={'Password'} secureTextEntry={showPassword} />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons name={showPassword ? "eye-outline" : "eye-lock-outline"} style={styles.eye} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotBtn} >
            <Text style={styles.forgot} onPress={handleForgot}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.bgPrimary,
  },
  login: {
    fontWeight: 700,
    fontSize: 30,
    color: Colors.textDark,
    marginTop: 20
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 15,
    marginTop: 20
  },
  input: {
    backgroundColor: Colors.bgSecondary,
    padding: 15,
    borderRadius: 10,
    position: 'relative',
    fontSize: 20,
    marginBottom: 10
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
  }

});


export default Login
