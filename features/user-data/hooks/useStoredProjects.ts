import { useEffect, useState } from "react";
import { ProjectData } from "../types";
import { getStoredProjectsData } from "../get-stored-user-data";
import { useRouteInfo } from "expo-router/build/hooks";

export function useStoredProjects(): ProjectData[] | null {
  const [projects, setProjects] = useState<ProjectData[] | null>(null)
  const route = useRouteInfo()

  useEffect(() => {
    async function func() {
      const res = await getStoredProjectsData()
    
      if (res) setProjects(res)
    }
    func()
  }, [route.pathname])

  return projects
}