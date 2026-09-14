import { COLORS } from "@/consts";
import UpdateUserDataOnRender from "@/features/user-data/updateUserDataOnRender";
import { AreYouSerious_400Regular, useFonts } from "@expo-google-fonts/are-you-serious";
import { Stack } from "expo-router";
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
      <Stack screenOptions={{ contentStyle: { backgroundColor: COLORS.bg_color } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{
          headerShown: true,
          headerTitle: "Project details",
          headerStyle: { backgroundColor: COLORS.bg_card_color },
          headerTitleStyle: { color: COLORS.macondo_yellow, fontFamily: "AreYouSerious", fontSize: 40 },
        }} />
      </Stack>
      {/* <Logger /> */}
    </UpdateUserDataOnRender>
  );
}
