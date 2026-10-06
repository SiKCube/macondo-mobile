import { STORAGE_KEYS } from "@/config/defaultConsts"
import { getStoredApiKey } from "@/config/getStoredApikey"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useEffect, useState } from "react"

export interface MonthData {
  month: string
  timezone: string
  days: DayData[]
}

export interface DayData {
  day: string
  status: "active" | "pending" | "frozen"
  seconds_logged: number
  had_journal: boolean
}

const parseDate = (todayDate: number) => {
  const year = new Date(todayDate).getUTCFullYear()
  const month = String(new Date(todayDate).getUTCMonth() + 1).length === 1 ?
    String("0" + (new Date(todayDate).getUTCMonth() + 1))
    :
    String(new Date(todayDate).getUTCMonth() + 1)

  return `${year}-${month}`
}

export function useMonth() {
  const [months, setMonths] = useState<MonthData[] | null>(null)
  const [loadingMonths, setLoadingMonths] = useState<boolean>(false)

  const updateMonth = async (currentDate: number) => {
    setLoadingMonths(true)
    const month = await fetchMonth(parseDate(currentDate))

    if (month) {
      await storeMonthData(month)
    }

    setMonths(await getStoredMonthData())
    setLoadingMonths(false)
  }

  useEffect(() => {
    console.log(months)
    updateMonth(Date.now())
  }, [])

  return { months, loadingMonths, updateMonth }
}

async function storeMonthData(newMonth: MonthData): Promise<boolean> {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEYS.activeCalendar)

    if (storedData) {
      const parsedStoredData: MonthData[] = JSON.parse(storedData)

      if (parsedStoredData) {
        const newDataTime = parseDate((new Date(newMonth.month)).getTime())

        let updatedData: MonthData[] = []

        parsedStoredData.forEach((current, index) => {
          const currentTime = parseDate((new Date(current.month)).getTime())

          if (newDataTime === currentTime) {
            updatedData.push(newMonth)
          }

          updatedData.push(current)
        })

        if (!updatedData.find((data) => data.month === newDataTime)) {
          updatedData.push(newMonth)
        }

        await AsyncStorage.setItem(STORAGE_KEYS.activeCalendar, JSON.stringify(updatedData))
        return true
      }
    }

    await AsyncStorage.setItem(STORAGE_KEYS.activeCalendar, JSON.stringify([newMonth]))
    return true
  } catch {
    return false
  }
}

async function fetchMonth(month: string): Promise<MonthData | null> {
  try {
    const apikey = await getStoredApiKey()

    if (!apikey) return null

    const { data } = await axios.request({
      method: "GET",
      params: {
        month: month
      },
      url: "https://macondo.hackclub.com/api/streaks/calendar",
      headers: {
        Authorization: `Bearer ${apikey}`
      }
    })

    const activeCalendarData: MonthData = data

    return activeCalendarData
  } catch {
    return null
  }
}

async function getStoredMonthData(): Promise<MonthData[] | null> {
  try {
    const projectsData = await AsyncStorage.getItem(STORAGE_KEYS.activeCalendar)

    if (!projectsData) return null

    const parsedData: MonthData[] = JSON.parse(projectsData)

    return parsedData
  } catch {
    return null
  }
}
