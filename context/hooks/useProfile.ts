import { STORAGE_KEYS } from "@/config/defaultConsts";
import { getStoredApiKey } from "@/config/getStoredApikey";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

export interface ProfileData {
  username: string
  image: string
  created_at: string
  timezome: string
  locale: string
  onBoarding_step: string
  steak_freezes: number
  worked_today: boolean
  longest_current_streak: number
  reminder_local_hours: number[]
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false)
  
  const updateProfileData = async () => {
    setLoadingProfile(true)
    const profileData = await fetchProfileData()

    if (profileData) {
      const storeData = await storeProfileData(profileData)
      
      if (storeData) setProfile(profileData)
      setLoadingProfile(false)
      return;
    }

    const storedData = await getStoredProfileData()

    setProfile(storedData)
    setLoadingProfile(false)
  }

  useEffect(() => {
    updateProfileData()
  }, [])

  return { profile, loadingProfile, updateProfileData }
}

async function fetchProfileData(): Promise<ProfileData | null> {
  try {
    const apikey = await getStoredApiKey()

    const { data } = await axios.request({
      method: 'GET',
      url: 'https://macondo.hackclub.com/api/auth/me',
      headers: {
        Authorization: `Bearer ${apikey}`
      },
    });

    const profileData: ProfileData = data

    return profileData
  } catch {
    return null
  }
}

async function storeProfileData(profileData: ProfileData): Promise<boolean> {
  try {
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

async function getStoredProfileData(): Promise<ProfileData | null> {
  try {
    const profileData = await AsyncStorage.getItem(STORAGE_KEYS.profile)

    if (!profileData) return null

    const parsedData: ProfileData = JSON.parse(profileData)

    return parsedData
  } catch {
    return null
  }
}
