import * as SecureStore from "expo-secure-store"

export async function getStoredApiKey(): Promise<string | null> {
  const apikey = await SecureStore.getItemAsync("api-key")

  return apikey
}

export async function removeStoredApiKey() {
  await SecureStore.deleteItemAsync("api-key")
}
