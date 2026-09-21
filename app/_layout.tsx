import { COLORS } from "@/consts";
import UpdateUserDataOnRender from "@/features/user-data/updateUserDataOnRender";
import { AreYouSerious_400Regular, useFonts } from "@expo-google-fonts/are-you-serious";
import { Stack } from "expo-router";
import { ChartKitProvider } from "react-native-chart-kit/v2";
import { CHART_STYLES } from "@/features/project-stats/chart-style";
// import Logger from "@/tests/logger";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    AreYouSerious: AreYouSerious_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UpdateUserDataOnRender>
      <ChartKitProvider mode="light" preset={"CHART_STYLES"} presets={{ CHART_STYLES }}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: COLORS.bg_color } }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="[id]" options={{
            headerShown: true,
            headerTitle: "Project details",
            headerStyle: { backgroundColor: COLORS.bg_card_color },
            headerTitleStyle: { color: COLORS.p_color, fontFamily: "AreYouSerious", fontSize: 40,  },
          }} />
        </Stack>
        {/* <Logger /> */}
      </ChartKitProvider>
    </UpdateUserDataOnRender>
  );
}
