import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActiveCalendarData, ProfileData, ProjectData, STORAGE_KEYS } from "./types";

export async function storeUserData(userAPIKey: string) {
  storeProfileData(userAPIKey)
  storeProjectsData(userAPIKey)

  const now = new Date()
  storeActiveCalendarData(userAPIKey, `${now.getUTCFullYear()}-${now.getUTCMonth()}`)
}

export async function storeProfileData(userAPIKey: string): Promise<boolean> {
  try {
    const { data } = await axios.request({
      method: 'GET',
      url: 'https://macondo.hackclub.com/api/auth/me',
      headers: {
        Authorization: `Bearer ${userAPIKey}`
      },
    });

    const profileData: ProfileData = data

    await AsyncStorage.setItem(STORAGE_KEYS.profile, JSON.stringify({
      username: profileData.username,
      image: profileData.image,
      created_at: profileData.created_at,
      locale: profileData.locale,
      longest_current_streak: profileData.longest_current_streak,
      onBoarding_step: profileData.onBoarding_step,
      steak_freezes: profileData.steak_freezes,
      worked_today: profileData.worked_today,
      timezome: profileData.timezome,
      reminder_local_hours: profileData.reminder_local_hours
    } as ProfileData))

    return true
  } catch {
    return false
  }
}

export async function storeProjectsData(userAPIKey: string): Promise<boolean> {
  try {
    const { data } = await axios.request({
      method: "GET",
      url: "https://macondo.hackclub.com/api/projects",
      headers: {
        Authorization: `Bearer ${userAPIKey}`,
      }
    })


    const prosessedData = data.map((project: ProjectData) => ({
      id: project.id,
      user_id: project.user_id,
      name: project.name,
      type: project.type,
      description: project.description,
      level: project.level,
      hackatime_hours_sum: project.hackatime_hours_sum,
      journals_hours_total: project.journals_hours_total,
      last_worked_date: project.last_worked_date,
      project_streak_days: project.project_streak_days,
      created_at: project.created_at,
      updated_at: project.updated_at,
    }))

    await AsyncStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(prosessedData))

    return true
  } catch {
    return false
  }
}

async function getMonthData(userAPIKey: string, month: string): Promise<ActiveCalendarData | null> {
  try {
    const { data } = await axios.request({
      method: "GET",
      params: {
        month: month
      },
      url: "https://macondo.hackclub.com/api/streaks/calendar",
      headers: {
        Authorization: `Bearer ${userAPIKey}`
      }
    })

    const activeCalendarData: ActiveCalendarData = data

    return activeCalendarData
  } catch {
    return null
  }
}

export async function storeActiveCalendarData(userAPIKey: string, month: string): Promise<boolean> {
  const storedData = await AsyncStorage.getItem(STORAGE_KEYS.activeCalendar)

  const newData = await getMonthData(userAPIKey, month)

  if (!newData) return false

  if (storedData) {
    const parsedStoredData: ActiveCalendarData[] = JSON.parse(storedData)
    
    if (parsedStoredData) {
      const newDataTime = (new Date(month)).getTime()

      const updatedData = parsedStoredData.map((current) => {
        const currentTime = (new Date(current.month)).getTime()

        if (newDataTime === currentTime) {
          return newData
        }

        return current
      })

      await AsyncStorage.setItem("active-calendar", JSON.stringify(updatedData))
      return true
    }
  }

  await AsyncStorage.setItem("active-calendar", JSON.stringify([newData]))
  return true
}
