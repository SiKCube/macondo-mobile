import { COLORS } from "@/consts";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: { backgroundColor: COLORS.bg_color },
        headerStyle: { backgroundColor: COLORS.bg_card_color },
        headerTitleStyle: { color: COLORS.macondo_yellow, fontFamily: "AreYouSerious", fontSize: 40, textShadowColor: "tuscan", textShadowRadius: 3 },
        tabBarStyle: { backgroundColor: COLORS.bg_card_color },
      }}
    >
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          headerTitle: "Your projects",
          tabBarActiveTintColor: COLORS.p_color,
          tabBarIcon: ({ focused }) => <Image source={require("../../assets/sprites/etapa_1.png")} resizeMode="contain" style={{ width: 38, opacity: focused ? 1 : 0.5 }} />,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Calculator",
          headerTitle: "Calculator",
          tabBarActiveTintColor: COLORS.p_color,
          tabBarIcon: ({ focused }) => <Image source={require("../../assets/sprites/money.png")} resizeMode="contain" style={{ width: 32, opacity: focused ? 1 : 0.5 }} />,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Me",
          headerTitle: "You",
          tabBarActiveTintColor: COLORS.p_color,
          tabBarIcon: ({ focused }) => <Image source={require("../../assets/sprites/profile.png")} resizeMode="contain" style={{ width: 28, opacity: focused ? 1 : 0.5 }} />,
        }}
      />
    </Tabs>
  )
}