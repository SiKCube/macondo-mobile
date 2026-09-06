import { COLORS } from "@/consts"
import { Text, View } from "react-native"

interface Props {
  text: string
}

export default function Pil({ text }: Props) {
  return (
    <View style={{ backgroundColor: COLORS.p_color, padding: 5  }}>
      <Text style={{ fontSize: 10, fontWeight: "bold", color: COLORS.bg_color }}>
        {text}
      </Text>
    </View>
  )
}