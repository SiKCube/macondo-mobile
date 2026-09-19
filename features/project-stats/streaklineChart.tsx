import MacondoButton from "@/components/ui/button"
import MacondoCard from "@/components/ui/card"
import MacondoText from "@/components/ui/text"
import MacondoTitle from "@/components/ui/title"
import { COLORS } from "@/consts"
import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { BarChart } from "react-native-chart-kit/v2"

interface Props {
  width: number
  height: number
}

interface StreakParsedData {
  day: string
  hours: number
}

interface StreakFetchData {
  day: string
  seconds_logged: number
  status: string
  hand_journal: boolean
}

const parseDate = (todayDate: number) => {
  const year = new Date(todayDate).getUTCFullYear()
  const month = String(new Date(todayDate).getUTCMonth() + 1).length === 1 ?
    String("0" + (new Date(todayDate).getUTCMonth() + 1))
    :
    String(new Date(todayDate).getUTCMonth() + 1)

  return `${year}-${month}`
}

export default function StreakLineChart({ width, height }: Props) {
  const [todayDate, setTodayDate] = useState<number>(Date.now())
  const [dataChart, setDataChart] = useState<StreakParsedData[] | null>(null)

  const [totalHours, setTotalHours] = useState<number | null>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const getChartData = async (dateToFetch: string) => {
    setLoading(true)
    const url = `https://macondo.hackclub.com/api/streaks/calendar?month=${dateToFetch}`

    console.log(dateToFetch)
    console.log(url)

    const apikey = await SecureStore.getItemAsync("api-key")

    const { data } = await axios.request({
      method: "GET",
      url: url,
      headers: {
        Authorization: `Bearer ${apikey}`
      },
    })

    let totalHours = 0

    const parsedData: StreakParsedData[] = data.days.map((day: StreakFetchData): StreakParsedData => {
      totalHours += day.seconds_logged / 3600

      return {
        day: day.day,
        hours: day.seconds_logged / 3600
      }
    })

    setDataChart([
      ...parsedData
    ])
    setTotalHours(totalHours)
    setLoading(false)
  }

  useEffect(() => {
    getChartData(parseDate(todayDate))
  }, [])

  return (
    <MacondoCard>
      <MacondoTitle text="Hours this month" size={25} />
      <MacondoText text={new Date(todayDate).toLocaleString("en-US", { month: "long", year: "numeric" })} size={15} />
      <MacondoText text={loading ? "Loading..." : ""} size={10} />
      <View style={{ gap: 16 }}>
        {
          dataChart ?
            dataChart.length > 0 ?
              <BarChart
                data={dataChart as any}
                xKey="day"
                yKey="hours"
                width={width}
                height={height}
                showHorizontalGridLines
                showValuesOnTopOfBars
                interaction={{
                  mode: "tap",
                }}
                scrollable
                formatYLabel={(value) => (`${value.toFixed(2)}h`)}
                visiblePoints={8}
              />
              :
              <MacondoCard>
                <MacondoTitle text="This month is empty :(" size={15} />
              </MacondoCard>
            :
            null
        }
        <View style={{ gap: 8 }}>
          {
            totalHours ?
              <MacondoCard>
                <Text style={{ color: COLORS.p_color, fontWeight: "bold" }}>
                  Total hours this month: {totalHours.toFixed(2) + "h"}
                </Text>
              </MacondoCard>
              :
              null
          }
          <View style={{ gap: 8 }}>
            <MacondoButton
              title={loading ? "Loading..." : "Past month"}
              disable={loading}
              type="p"
              onClick={() => {
                const newDate: Date = new Date(todayDate)
                const monthPast: number = newDate.getUTCMonth() - 1

                const r = newDate.setUTCMonth(monthPast)
                setTodayDate(r)

                getChartData(parseDate(r))
              }}
            />
            <MacondoButton
              title={loading ? "Loading..." : "Next month"}
              disable={loading}
              type="p"
              onClick={() => {
                const newDate: Date = new Date(todayDate)
                const monthPast: number = newDate.getUTCMonth() + 1

                const r = newDate.setUTCMonth(monthPast)
                setTodayDate(r)

                getChartData(parseDate(r))
              }}
            />
          </View>
        </View>
      </View>
    </MacondoCard>
  )
}
