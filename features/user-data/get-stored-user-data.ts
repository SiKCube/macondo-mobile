import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActiveCalendarData, ProfileData, ProjectData, STORAGE_KEYS } from "./types";

export async function getStoredProfileData(): Promise<ProfileData | null> {
  const profileData = await AsyncStorage.getItem(STORAGE_KEYS.profile)

  if (!profileData) return null

  const parsedData: ProfileData = JSON.parse(profileData)

  return parsedData
}

export async function getStoredProjectsData(): Promise<ProjectData[] | null> {
  const projectsData = await AsyncStorage.getItem(STORAGE_KEYS.projects)

  if (!projectsData) return null

  const parsedData: ProjectData[] = JSON.parse(projectsData)

  return parsedData
}

export async function getStoredActiveCalendarData(): Promise<ActiveCalendarData[] | null> {
  const projectsData = await AsyncStorage.getItem(STORAGE_KEYS.activeCalendar)

  if (!projectsData) return null

  const parsedData: ActiveCalendarData[] = JSON.parse(projectsData)

  return parsedData
}