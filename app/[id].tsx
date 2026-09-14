import Loading from "@/components/loading";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { WebView } from "react-native-webview";

export default function ProjectId() {
  const { id } = useLocalSearchParams()
  const [loading, setLoading] = useState<boolean>(true)

  return (
    <>
      <WebView
        source={{ uri: `https://macondo.hackclub.com/projects/${id}` }}
        onLoad={() => setLoading(false)}
      />
      {
        loading ? 
          <Loading />
          :
          null
      }
    </>
  )
}
