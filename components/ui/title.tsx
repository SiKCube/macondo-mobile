import { COLORS } from "@/consts";
import { Text } from "react-native";

interface Props {
  size: number
  text: string
}

export default function MacondoTitle({ size, text }: Props) {
  return (
    <Text style={{
      color: COLORS.p_color,
      fontSize: size,
      fontWeight: "bold"
    }}>
      {text}
    </Text>
  )
}