import MacondoCard from "@/components/ui/card";
import MacondoTitle from "@/components/ui/title";
import { useDataCtx } from "@/context/data-context-provider";
import { Image, View } from "react-native";

export default function LongestStreak() {
  const { profile, loadingProfile } = useDataCtx()

  return (
    <MacondoCard>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Image
          style={{ width: 45, height: 45 }}
          resizeMode="contain"
          source={require("../../assets/sprites/fire.png")}
        />
        {
          !loadingProfile && profile ?
            <MacondoTitle size={20} text={String(profile?.longest_current_streak) ?? "Error"} />
            :
            "Loading..."            
        }
      </View>
    </MacondoCard>
  )
}