import { View } from "react-native";
import StockCard from "@/components/StockCard";
import { data } from "@/constants/onboardingData";
import StockvestHeader from "@/components/StockvestHeader";
import { Colors } from "@/constants/colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.bgPrimary
      }}
    >
      <StockvestHeader />
      {
        data.map((data) => {
          return <StockCard data={data} key={data.name} />
        })
      }
    </View>
  );
}
