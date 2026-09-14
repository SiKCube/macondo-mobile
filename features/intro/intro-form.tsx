import MacondoCardMark from "@/components/ui/card-mark"
import { useSecureStore } from "@/hooks/useSecureStore"
import axios from "axios"
import { Link, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View } from "react-native"
import MacondoButton from "../../components/ui/button"
import MacondoInput from "../../components/ui/input"
import { storeUserData } from "../user-data/store-user-data"

export default function IntroForm() {
  const [inputVal, setInputVal] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { saveSecureValue } = useSecureStore("api-key")

  const handler = async () => {
    setLoading(true)
    if (inputVal) {
      const { data } = await axios.request({
        method: 'GET',
        url: 'https://macondo.hackclub.com/api/auth/me',
        headers: {
          Authorization: `Bearer ${inputVal}`
        },
      });

      if (data) {
        await saveSecureValue("api-key", inputVal)
        storeUserData(inputVal)
        router.navigate("/projects")
      }
    }
    setLoading(false)
  }

  return (
    <View style={{ height: 200, width: 350 }}>
      <MacondoCardMark>
        <View style={{ gap: 10 }}>
          <MacondoInput
            disable={loading}
            placeholder="Your Macondo API key"
            type="text"
            setValue={setInputVal}
            value={inputVal as string}
          />
          <MacondoButton title={loading ? "Loading" : "Enter"} type="p" onClick={handler} disable={loading} />
        </View>
        <View style={{ paddingTop: 20 }}>
          <Link href={"https://google.com"}>Where is my API key?</Link>
        </View>
      </MacondoCardMark>
    </View>
  )
}