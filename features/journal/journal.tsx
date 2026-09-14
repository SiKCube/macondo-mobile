import { Image, View } from "react-native";
import Markdown from "react-native-markdown-display";
import Video from "react-native-video";

const isVideo = (url: string) => {
  return /\.(mp4|mov|m4v|webm|avi|mkv)(\?.*)?$/i.test(url);
}

export default function Journal({ children }: { children: React.ReactNode }) {
  return (
    <Markdown
      rules={{
        image: (node, children, parent) => {
          const url = node.attributes?.src
          console.log(url)

          if (url) return null


          if (isVideo(url)) {
            return (
              <View key={node.key}>
                <Video
                  source={{ uri: "https://cdn.hackclub.com/01a02c38-1505-7026-813f-3c101a5fbfeb/20260823-0119-42.6556097.mp4" }}
                  controls
                  paused
                  style={{
                    width: 200,
                    height: 100
                  }}
                  resizeMode="contain"
                />
              </View>
            )
          }

          return (
            <Image
              source={{ uri: "https://cdn.hackclub.com/01a01cf8-ae00-7466-99a6-b1e8fc6888e9/image.png" }}
              // resizeMode="contain"
              style={{ width: 200, height: 150 }}
              key={node.key}
            />
          )
        }
      }}
    >
      {children}
    </Markdown>
  )
}