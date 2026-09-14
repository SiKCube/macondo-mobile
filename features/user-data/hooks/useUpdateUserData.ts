import { useSecureStore } from "@/hooks/useSecureStore"
import { useRouter } from "expo-router"
import { useRouteInfo } from "expo-router/build/hooks"
import { storeUserData } from "../store-user-data"

export function useUpdateUserData(): Function {
  const { getSecureValue } = useSecureStore("api-key")
  const router = useRouter()
  const { pathname } = useRouteInfo()

  const updateUserData = async () => {
    const apiKey = await getSecureValue("api-key")

    if (apiKey) {
      await storeUserData(apiKey)
      if (pathname === "/") {
        router.navigate("/projects")
      }
    }
  }

  return updateUserData
}