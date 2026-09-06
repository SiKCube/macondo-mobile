import MacondoButton from "@/components/ui/button";
import MacondoCard from "@/components/ui/card";
import MacondoTitle from "@/components/ui/title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";
import { useStoredProfile } from "../user-data/hooks/useStoredProfile";
import { STORAGE_KEYS } from "../user-data/types";
import { useSecureStore } from "@/hooks/useSecureStore";

export default function ProfileCard() {
  const profile = useStoredProfile()
  const { getSecureValue, removeSecureValue } = useSecureStore("api-key")
  const router = useRouter()

  return (
    <>
      {
        profile ?
          <MacondoCard>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 15 }}>
              <Image width={90} height={90} source={{ uri: profile.image }} />
              <View>
                <MacondoTitle size={30} text={profile.username} />
                <MacondoButton type="p" title="Sign out" disable={false} onClick={async () => {
                  const apiKey = await getSecureValue("api-key")

                  if (apiKey) {
                    await removeSecureValue("api-key")
                    await AsyncStorage.multiRemove([STORAGE_KEYS.activeCalendar, STORAGE_KEYS.profile, STORAGE_KEYS.projects])
                    router.navigate("/")
                  }
                }} />
              </View>
            </View>
          </MacondoCard>
          :
          null
      }
    </>
  )
}