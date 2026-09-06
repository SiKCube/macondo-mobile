import { COLORS } from "@/consts";
import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
  children: ReactNode
}

export default function MacondoCard({ children }: Props) {
  return (
    <View
      style={{
        borderWidth: 3,
        borderColor: COLORS.border_card_color,
        backgroundColor: COLORS.bg_card_color,
        padding: 16,
      }}
    >
      {children}
    </View>
  )
}