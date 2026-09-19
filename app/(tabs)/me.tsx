import Balance from "@/features/profile/balance";
import LongestStreak from "@/features/profile/longest-streak";
import ProfileCard from "@/features/profile/profile-card";
import StreakLineChart from "@/features/project-stats/streaklineChart";
import StreakPieChart from "@/features/project-stats/streakPieChart";
import UpdateUserDataBtn from "@/features/user-data/updateUserDataBtn";
import { ScrollView, View } from "react-native";

export default function Me() {
  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={{ gap: 16 }}>
        <ProfileCard />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Balance />
          <LongestStreak />
        </View>
        <StreakLineChart
          width={300}
          height={200}
        />
        <StreakPieChart
          hegint={200}
          width={300}
        />
        <UpdateUserDataBtn />
      </View>
      <View style={{ height: 60, width: "100%" }} />
    </ScrollView>
  )
}