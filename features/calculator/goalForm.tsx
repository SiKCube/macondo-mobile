import MacondoButton from "@/components/ui/button";
import MacondoCard from "@/components/ui/card";
import MacondoInput from "@/components/ui/input";
import MacondoTitle from "@/components/ui/title";
import { COLORS } from "@/consts";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ProgressRing } from "react-native-chart-kit/v2";
import { useStoredProjects } from "../user-data/hooks/useStoredProjects";
import { goldByHours } from "./gold-by-time";
import MacondoText from "@/components/ui/text";

export default function GoalForm() {
  const [goalAmount, setGoalAmount] = useState<number>(0)
  const [projectedGold, setProjectedGold] = useState<number | null>(null)
  const projects = useStoredProjects()
  const [balance, setBalance] = useState<number>(0)

  const handler = () => {
    if (projects) {
      let kindaGold = 0

      projects.forEach((proj) => {
        const totalHours = proj.hackatime_hours_sum + proj.journals_hours_total

        kindaGold += goldByHours(
          proj.project_streak_days,
          proj.level,
          totalHours
        )
      })

      setProjectedGold(kindaGold)
    }
  }

  const fetchBalance = async () => {
    const apikey = await SecureStore.getItemAsync("api-key")

    const { data } = await axios.request({
      method: "GET",
      url: "https://macondo.hackclub.com/api/users/balance",
      headers: {
        Authorization: `Bearer ${apikey}`
      }
    })

    setBalance(data.balance)
  }

  useEffect(() => {
    if (goalAmount > 0) fetchBalance()
  }, [goalAmount])

  return (
    <MacondoCard>
      <View style={{ gap: 16 }}>
        <MacondoTitle
          size={20}
          text="Get goal progress"
        />
        <View>
          <MacondoTitle
            size={15}
            text="Goal gold amount"
          />
        <MacondoInput
          placeholder="Goal gold amount"
          disable={false}
          type="numeric"
          value={String(goalAmount)}
          setValue={(current) => setGoalAmount(Number(current))}
        />
        </View>
        <MacondoButton
          title="Submit"
          type="p"
          onClick={handler}
          disable={false}
        />
        {
          projectedGold && goalAmount ?
            <View style={{ gap: 16 }}>
              <View style={{ alignItems: 'center' }}>
                <ProgressRing
                  value={((projectedGold * 100) / goalAmount) * 0.01}
                  height={150}
                  width={150}
                  centerLabel={String(((projectedGold * 100) / goalAmount).toFixed(2)) + "%"}
                />
              </View>
              <MacondoCard>
                <MacondoTitle text={`Current progress: ${projectedGold}/${goalAmount}`} size={15} />
                <MacondoTitle text={`Remaining: ${goalAmount - projectedGold}`} size={15} />
              </MacondoCard>
              <View style={{ alignItems: "center" }}>
                <ProgressRing
                  value={((balance * 100) / goalAmount) * 0.01}
                  height={150}
                  width={150}
                  color={COLORS.macondo_yellow}
                  centerLabel={String(((balance * 100) / goalAmount).toFixed(2)) + "%"}
                />
              </View>
              <MacondoCard>
                <MacondoTitle text={`Current progress: ${balance}/${goalAmount}`} size={15} />
                <MacondoTitle text={`Remaining: ${goalAmount - balance}`} size={15} />
              </MacondoCard>
            </View>
            :
            null
        }
      </View>
    </MacondoCard>
  )
}