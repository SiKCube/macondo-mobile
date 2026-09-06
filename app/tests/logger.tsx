import { useEffect } from "react";
import { useSecureStore } from "../../hooks/useSecureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logger() {
  const { getSecureValue } = useSecureStore("api-key")

  useEffect(() => {
    const func = async () => {
      const apiKey = await getSecureValue("api-key")

      console.info("API-KEY: " + apiKey)
      const keys = await AsyncStorage.getAllKeys()
      console.log(keys)
      
      keys.map(async (key) => {
        console.log(await AsyncStorage.getItem(key))
      })
    }
    func()
  }, [])

  return (<></>)
}