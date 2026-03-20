import Title from '@/components/Title';
import Subtitle from '@/components/Subtitle'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextInputKeyPressEvent } from 'react-native'
import CustomButton from '@/components/CustomButton';
import { typography } from '@/constants/typography';
import { Colors } from '@/constants/colors';
import { useRef, RefObject, useState, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'expo-router';

const Otp = () => {
  const router = useRouter()
  const states: [string, Dispatch<SetStateAction<string>>][] = [
    useState<string>(""),
    useState<string>(""),
    useState<string>(""),
    useState<string>("")
  ]
  const otp: RefObject<TextInput | null>[] = [
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null)]

  const handleChange = (index: number, value: string) => {
    states[index][1](value);
    if (value.length === 1 && index < 3) {
      otp[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (index: number, e: TextInputKeyPressEvent) => {
    if (e.nativeEvent.key === 'Backspace' && states[index][0] === '') {
      if (index > 0) {
        otp[index - 1].current?.focus();
      }
    }
  };
  const handleChangeEmail = () => {
    router.back()
  }

  return (
    <View style={styles.container}>
      <Title text='OTP' />
      <Subtitle text='we have sent an OTP to your Email' />
      <View style={styles.otp}>
        <TextInput value={states[0][0]} keyboardType='numeric' style={styles.digit} maxLength={1} onChangeText={(value) => handleChange(0, value)} onKeyPress={(e) => handleKeyPress(0, e)} ref={otp[0]} />
        <TextInput value={states[1][0]} keyboardType='numeric' style={styles.digit} maxLength={1} onChangeText={(value) => handleChange(1, value)} onKeyPress={(e) => handleKeyPress(1, e)} ref={otp[1]} />
        <TextInput value={states[2][0]} keyboardType='numeric' style={styles.digit} maxLength={1} onChangeText={(value) => handleChange(2, value)} onKeyPress={(e) => handleKeyPress(2, e)} ref={otp[2]} />
        <TextInput value={states[3][0]} keyboardType='numeric' style={styles.digit} maxLength={1} onChangeText={(value) => handleChange(3, value)} onKeyPress={(e) => handleKeyPress(3, e)} ref={otp[3]} />
      </View>
      <CustomButton text='Verify' styleProp={{ marginVertical: typography.size.lg }} handlePress={() => { }} />
      <Subtitle text='OTP not received?' styleProp={{ marginVertical: typography.size.xs }} />
      <View style={styles.sub}>
        <TouchableOpacity>
          <Text style={styles.danger}>Resend OTP</Text>
        </TouchableOpacity>
        <Text style={styles.subText}>or</Text>
        <TouchableOpacity onPress={handleChangeEmail}>
          <Text style={styles.danger}>Change Email</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: typography.size.xxl,
    backgroundColor: Colors.bgPrimary
  },
  otp: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: typography.size.xs,
    marginVertical: typography.size.xs
  },
  digit: {
    borderWidth: 1,
    width: 56,
    height: 56,
    borderRadius: typography.size.xs,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    paddingHorizontal: 18
  },
  sub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 6,
    marginTop: typography.size.xl
  },
  subText: {
    fontSize: typography.size.lg
  },
  danger: {
    color: Colors.loss,
    fontSize: typography.size.lg
  },
  submit: {
    marginVertical: typography.size.lg,
  },

});


export default Otp
