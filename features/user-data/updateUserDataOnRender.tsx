import { useEffect } from "react";
import { useUpdateUserData } from "./hooks/useUpdateUserData";

export default function UpdateUserDataOnRender({ children }: { children: React.ReactNode }) {
  const updateUserData = useUpdateUserData()

  useEffect(() => {
    updateUserData()
  }, [])

  return (
    <>
      {children}
    </>
  )
}