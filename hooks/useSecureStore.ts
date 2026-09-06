import * as SecureStore from "expo-secure-store"
import { useEffect } from "react"

async function saveSecureValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}

async function removeSecureValue(key: string) {
  await SecureStore.deleteItemAsync(key)
}

async function getSecureValue(key: string) {
  const r = await SecureStore.getItemAsync(key)
  return r
}

export function useSecureStore(key: string, value?: string) {
  useEffect(() => {
    const storeData = async () => {
      let secureData = await SecureStore.getItemAsync(key)

      if (!secureData) {
        await SecureStore.setItemAsync(key, value ? value : "")
      }
    }

    storeData()
  }, [])

  return {
    saveSecureValue,
    removeSecureValue,
    getSecureValue
  }
}