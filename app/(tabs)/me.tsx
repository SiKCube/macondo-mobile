import Balance from "@/features/profile/balance";
import LongestStreak from "@/features/profile/longest-streak";
import ProfileCard from "@/features/profile/profile-card";
import UpdateUserDataBtn from "@/features/user-data/updateUserDataBtn";
import { View } from "react-native";

export default function Me() {
  return (
    <View style={{ padding: 16, gap: 16 }}>
      <ProfileCard />
      <View style={{ flexDirection: "row",  justifyContent: "space-evenly" }}>
        <Balance />
        <LongestStreak />
      </View>
      <UpdateUserDataBtn />
    </View>
  )
}