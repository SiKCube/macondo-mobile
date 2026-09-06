import { useEffect, useState } from "react";
import { getStoredProfileData } from "../get-stored-user-data";
import { ProfileData } from "../types";
import { useRouteInfo } from "expo-router/build/hooks";

export function useStoredProfile(): ProfileData | null {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const route = useRouteInfo()

  useEffect(() => {
    async function func() {
      const res = await getStoredProfileData()

      if (res) setProfile(res)
    }
    func()
  }, [route.pathname])

  return profile
}