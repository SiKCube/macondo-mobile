import MacondoButton from "@/components/ui/button";
import { useState } from "react";
import { useUpdateUserData } from "./hooks/useUpdateUserData";

export default function UpdateUserDataBtn() {
  const updateUserData = useUpdateUserData()
  const [loading, setLoading] = useState<boolean>(false)

  const handler = async () => {
    setLoading(true)
    await updateUserData()
    setLoading(false)
  }

  return (
    <MacondoButton title={loading ? "Loading..." : "Reload data"} type="p" onClick={handler} disable={loading} />
  )
}