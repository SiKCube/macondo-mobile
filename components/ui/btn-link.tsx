import { COLORS } from "@/consts";
import { RelativePathString, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

interface Props {
  title: string
  disable?: boolean
  type: "p" | "s"
  linkTo: `/${string}`
}

export default function MacondoButtonLink({ title, disable, type, linkTo }: Props) {
  const router = useRouter()

  return (
    <TouchableHighlight disabled={disable} onPress={() => router.push(linkTo as RelativePathString)}
      style={type === "p" ? styles.primary : styles.secondary}>
      <View>
        <Text style={type === "p" ? styles.primary_text : styles.secondary_text}>{title}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.p_color,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  primary_text: {
    color: COLORS.bg_card_color,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontWeight: "700"
  },
  secondary: {
    backgroundColor: COLORS.bg_card_color,
    borderColor: COLORS.p_color,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  secondary_text: {
    color: COLORS.p_color,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontWeight: "700"
  },
})