import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function ProjectId() {
  const { id } = useLocalSearchParams()

  return (
    <View>
      <Text>ON progress</Text>
    </View>
    // <WebView
    //   style={styles.container}
    //   source={{ uri: `https://macondo.hackclub.com/projects/${id}` }}
    // />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
