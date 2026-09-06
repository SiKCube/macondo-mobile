import { COLORS } from "@/consts"
import { Text } from "react-native"

interface Props {
  size: number
  text: string
}

export default function MacondoText({ size, text }: Props) {
  return (
    <Text
      style={{
        color: COLORS.text_color,
        fontSize: size
      }}
    >
      {text}
    </Text>
  )
} 
