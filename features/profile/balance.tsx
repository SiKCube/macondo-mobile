import MacondoCard from "@/components/ui/card";
import MacondoTitle from "@/components/ui/title";
import { useSecureStore } from "@/hooks/useSecureStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";

export default function Balance() {
  const [balance, setBalance] = useState<number | null>()
  const { getSecureValue } = useSecureStore("api-key")
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getBalance = async () => {
      setLoading(true)
      const apikey = await getSecureValue("api-key")

      const { data } = await axios.request({
        method: "GET",
        url: "https://macondo.hackclub.com/api/users/balance",
        headers: {
          Authorization: `Bearer ${apikey}`
        }
      })

      setBalance(data.balance)
      setLoading(false)
    }
    getBalance()
  }, [])

  return (
    <MacondoCard>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Image
          style={{ width: 45, height: 45 }}
          resizeMode="contain"
          source={require("../../assets/sprites/money.png")}
        />
        <MacondoTitle size={20} text={loading ? "Loading" : String(balance)} />
      </View>
    </MacondoCard>
  )
}