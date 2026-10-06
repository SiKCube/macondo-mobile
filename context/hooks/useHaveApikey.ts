import { getStoredApiKey } from "@/config/getStoredApikey"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useRouteInfo } from "expo-router/build/hooks"
import { useEffect } from "react"

export function useHaveApikey() {
  const router = useRouter()
  const { pathname } = useRouteInfo()

  const haveApikey = async () => {
    const apiKey = await getStoredApiKey()

    if (apiKey) {
      if (pathname === "/") {
        router.navigate("/projects")
      }
    }
  }

  useEffect(() => {
    haveApikey()
  }, [])
}