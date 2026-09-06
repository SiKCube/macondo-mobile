import { useEffect, useState } from "react";
import { ActiveCalendarData } from "../types";
import { getStoredActiveCalendarData } from "../get-stored-user-data";
import { useRouteInfo } from "expo-router/build/hooks";

export function useStoredActivity():  ActiveCalendarData[] | null {
  const [activity, setActivity] = useState<ActiveCalendarData[] | null>(null)
  const router = useRouteInfo()

  useEffect(() => {
    async function func() {
      const res = await getStoredActiveCalendarData()
    
      if (res) setActivity(res)
    }
    func()
  }, [router.pathname])

  return activity
}
