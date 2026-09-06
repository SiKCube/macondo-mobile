import MacondoCard from "@/components/ui/card";
import MacondoTitle from "@/components/ui/title";
import { View, Image } from "react-native";
import { useStoredProfile } from "../user-data/hooks/useStoredProfile";

export default function LongestStreak() {
  const profile = useStoredProfile()
  
  return (
    <MacondoCard>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Image
          style={{ width: 45, height: 45 }}
          resizeMode="contain"
          source={require("../../assets/sprites/fire.png")}
        />
        <MacondoTitle size={20} text={String(profile?.longest_current_streak) ?? "Error"} />
      </View>
    </MacondoCard>
  )
}