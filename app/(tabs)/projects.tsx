import { ImageBackground, ScrollView } from "react-native";
import ProjectsList from "@/features/project-list/projects-list";

export default function Projects() {
  return (
    <ImageBackground source={require("../../assets/background/granja-bg.jpg")} style={{ height: "102%" }} resizeMode="cover" >
      <ScrollView>
        <ProjectsList />        
      </ScrollView>
    </ImageBackground>
  )
}
