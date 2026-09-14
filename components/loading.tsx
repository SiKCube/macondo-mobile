import { COLORS } from "@/consts";
import { Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={{ position: "fixed", zIndex: 10, height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: COLORS.bg_card_color, padding: 20, borderRadius: 15 }}>
        <Text>LOADING...</Text>
      </View>
    </View>
  )
}