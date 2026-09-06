import { Image, TouchableHighlight, View } from "react-native";
import MacondoCardMark from "../../components/ui/card-mark";
import Pil from "../../components/ui/pil";
import MacondoTitle from "../../components/ui/title";
import { goldByHours } from "../calculator/gold-by-time";
import Plant from "./plant";
import { useRouter } from "expo-router";

interface Props {
  id: number
  name: string
  type: string
  project_streak_days: number
  hackatime_hours_sum: number
  level: "1" | "2" | "3" | "4"
  last_worked_date: string
}

export default function ProjectCard({ id, name, type, project_streak_days, hackatime_hours_sum, level, last_worked_date }: Props) {
  const workDateTime = new Date(last_worked_date).getTime()
  const router = useRouter()

  return (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", marginTop: 7.5, marginBottom: 7.5 }} >
      <TouchableHighlight onPress={() => {
        router.navigate(`/${id}`)
      }}>
        <Plant />
      </TouchableHighlight>
      <MacondoCardMark >
        <MacondoTitle text={name} size={15} />
        <View style={{ flex: 1, gap: 3, flexDirection: "row" }}>
          <Pil text={String(level)} />
          <Pil text={type} />
          <Pil text={String(Math.round(hackatime_hours_sum)) + "h"} />
        </View>
        <View style={{ flex: 1, gap: 5, flexDirection: "row", marginTop: 15 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {
              workDateTime === new Date().getTime() ?
                <Image source={require("../../assets/sprites/fire.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                :
                <Image source={require("../../assets/sprites/fire-off.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
            }
            <MacondoTitle text={String(project_streak_days)} size={15} />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image source={require("../../assets/sprites/money.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
            <MacondoTitle text={String(goldByHours(project_streak_days, level, hackatime_hours_sum))} size={15} />
          </View>
        </View>
      </MacondoCardMark>
    </View>

  )
}