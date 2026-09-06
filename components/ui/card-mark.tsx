import { COLORS } from "@/consts";
import { ReactNode } from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";

interface Props {
  children: ReactNode
}

export default function MacondoCardMark({ children }: Props) {
  return (
    <View style={{ position: "relative" }}>
      <ScrollView style={styles.divBg}>
        {children}
      </ScrollView>
      <Image style={styles.left} resizeMode="stretch" source={require("../../assets/marco/left.png")} />
      <Image style={styles.right} resizeMode="stretch" source={require("../../assets/marco/right.png")} />
      <Image style={styles.top} resizeMode="stretch" source={require("../../assets/marco/top.png")} />
      <Image style={styles.bottom} resizeMode="stretch" source={require("../../assets/marco/bottom.png")} />
      <Image style={styles.top_left} source={require("../../assets/marco/top_left.png")} />
      <Image style={styles.top_right} source={require("../../assets/marco/top_right.png")} />
      <Image style={styles.bottom_left} source={require("../../assets/marco/bottom_left.png")} />
      <Image style={styles.bottom_right} source={require("../../assets/marco/bottom_right.png")} />
    </View>
  )
}

const styles = StyleSheet.create({
  divBg: {
    backgroundColor: COLORS.bg_card_color,
    margin: 12,
    padding: 15,
  },
  top: {
    position: "absolute",
    pointerEvents: "none",
    top: 1,
    height: 64,
    width: "100%",
    backgroundImage: "../../assets/marco/right.png",
  },
  bottom: {
    position: "absolute",
    pointerEvents: "none",
    bottom: 1,
    height: 64,
    width: "100%",
    backgroundImage: "../../assets/marco/right.png",
  },
  right: {
    position: "absolute",
    pointerEvents: "none",
    right: 6,
    width: 64,
    height: "100%",
    backgroundImage: "../../assets/marco/right.png",
  },
  left: {
    position: "absolute",
    pointerEvents: "none",
    left: 6,
    height: "100%",
    backgroundImage: "../../assets/marco/right.png",
  },
  top_right: {
    position: "absolute",
    pointerEvents: "none",
    top: 1,
    right: 1,
  },
  top_left: {
    position: "absolute",
    pointerEvents: "none",
    top: 1,
    left: 1,
  },
  bottom_right: {
    position: "absolute",
    pointerEvents: "none",
    bottom: 1,
    right: 1,
  },
  bottom_left: {
    position: "absolute",
    pointerEvents: "none",
    bottom: 1,
    left: 1,
  },
})
