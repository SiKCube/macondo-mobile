import IntroForm from "@/features/intro/intro-form";
import { ImageBackground } from "expo-image";

export default function Index() {
  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      source={require("../assets/background/index-bg.jpg")}
    >
      <IntroForm />
    </ImageBackground>
  );
}
