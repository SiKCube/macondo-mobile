import { createContext, useContext } from "react";
import { ProfileData, useProfile } from "./hooks/useProfile";
import { ProjectData, useProjects } from "./hooks/useProjects";
import { MonthData, useMonth } from "./hooks/useMonth";

interface ContextDataTypes {
  // Profile
  profile: ProfileData | null
  loadingProfile: boolean
  updateProfileData: () => void
  // Projects
  projects: ProjectData[] | null
  loadingProjects: boolean
  updateProjects: () => void
  // Calendar
  months: MonthData[] | null
  loadingMonths: boolean
  updateMonth: (currentDate: number) => void
}

const ContextData = createContext<ContextDataTypes>({
  profile: null,
  loadingProfile: false,
  updateProfileData: () => { },
  projects: null,
  loadingProjects: false,
  updateProjects: () => { },
  months: null,
  loadingMonths: false,
  updateMonth: () => {}
})

export default function DataContextProvider({ children }: { children: React.ReactNode }) {
  const { profile, loadingProfile, updateProfileData } = useProfile()
  const { projects, loadingProjects, updateProjects } = useProjects()
  const { months, loadingMonths, updateMonth } = useMonth()

  return (
    <ContextData.Provider value={{
      profile, loadingProfile, updateProfileData,
      projects, loadingProjects, updateProjects,
      months, loadingMonths, updateMonth
    }}>
      {children}
    </ContextData.Provider>
  )
}

export const useDataCtx = () => useContext(ContextData)
