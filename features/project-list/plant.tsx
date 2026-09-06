import { Image, StyleSheet, View } from "react-native";

export default function Plant() {
  return (
    <View style={styles.view}>
      <Image style={{ width: 100 }} resizeMode="contain" source={require("../../assets/sprites/ground_tile.png")} />
      <Image style={{ width: 60, position: "absolute", left: "15%" }} resizeMode="contain" source={require("../../assets/sprites/etapa_1.png")} />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    position: "relative"
  },
  plant: {
    width: 100,
  }
})
