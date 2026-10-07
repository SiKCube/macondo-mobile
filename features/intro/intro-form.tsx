import MacondoCardMark from "@/components/ui/card-mark"
import MacondoTitle from "@/components/ui/title"
import { useSecureStore } from "@/hooks/useSecureStore"
import axios from "axios"
import { useRouter } from "expo-router"
import { useState } from "react"
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
        <View style={{ gap: 10, paddingBottom: 70 }}>
          <View>
            <MacondoInput
              disable={loading}
              placeholder="Your Macondo API key"
              type="text"
              setValue={setInputVal}
              value={inputVal as string}
            />
            <MacondoTitle
              text="Your Macondo API_KEY"
              size={10}
            />
          </View>
          <MacondoButton
            onClick={handler}
            title={loading ? "Loading" : "Enter"}
            type="p"
            disable={loading || inputVal.length < 1}
          />
        </View>
      </MacondoCardMark>
    </View>
  )
}