import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import StockCard from "@/components/StockCard";
import { data } from "@/constants/onboardingData";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import Title from "@/components/Title";
import Subtitle from "@/components/Subtitle";
import CustomButton from "@/components/CustomButton";

export default function Index() {
  const router = useRouter()
  const handleStarted = () => {
    router.replace('/(auth)/Login')
  }
  return (
    <View
      style={styles.container}
    >
      <Image source={require('@/assets/images/graph.png')} style={styles.graph} />
      <View style={styles.main}>
        <View style={styles.cardBox}>
          <StockCard data={data[0]} key={data[0].name} top={20} left={0} />
          <StockCard data={data[1]} key={data[1].name} top={60} left={130} />
          <StockCard data={data[2]} key={data[2].name} top={180} left={0} />
          <StockCard data={data[3]} key={data[3].name} top={220} left={130} />
        </View>
        <View style={styles.intro}>
          <Title text="Easy Stock Investment For Beginners" />
          <Subtitle text="Screening feature to filter stocks to maximize profits" />
          <CustomButton text="Let's Get Started" handlePress={handleStarted} styleProp={{ marginTop: 40 }} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  graph: {
    position: 'absolute'
  },
  main: {
    paddingHorizontal: 30
  },
  cardBox: {
    height: 360
  },
  intro: {
    paddingTop: 20,
  },
  header: {
    color: Colors.textDark,
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
  },
  sub: {
    color: Colors.textLight,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 15

  },
  buttonText: {
    color: Colors.textDark,
    fontWeight: 500,
    fontSize: 18
  }

});

