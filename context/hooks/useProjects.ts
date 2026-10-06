import { STORAGE_KEYS } from "@/config/defaultConsts";
import { getStoredApiKey } from "@/config/getStoredApikey";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

export interface ProjectData {
  id: number
  user_id: string
  name: string
  type: string
  description: string
  level: "1" | "2" | "3" | "4"
  hackatime_hours_sum: number
  journals_hours_total: number
  last_worked_date: string
  project_streak_days: number
  created_at: string
  updated_at: string
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectData[] | null>(null)
  const [loadingProjects, setLoadingProjects] = useState<boolean>(false)

  const updateProjects = async () => {
    setLoadingProjects(true)
    const projectsData = await fetchProjectsData()

    if (projectsData) {
      const storeData = await storeProjectsData(projectsData)

      if (storeData) setProjects(projectsData)
      setLoadingProjects(false)
      return;
    }

    const storedData = await getStoredProjectsData()

    setProjects(storedData)
    setLoadingProjects(false)
  }

  useEffect(() => {
    updateProjects()
  }, [])

  return { projects, loadingProjects, updateProjects }
}

async function fetchProjectsData():Promise<ProjectData[] | null> {
  try {
    const apikey = await getStoredApiKey()

    const { data } = await axios.request({
      method: "GET",
      url: "https://macondo.hackclub.com/api/projects",
      headers: {
        Authorization: `Bearer ${apikey}`,
      }
    })

    const prosessedData = data.map((project: ProjectData) => ({
      id: project.id,
      user_id: project.user_id,
      name: project.name,
      type: project.type,
      description: project.description,
      level: project.level,
      hackatime_hours_sum: project.hackatime_hours_sum,
      journals_hours_total: project.journals_hours_total,
      last_worked_date: project.last_worked_date,
      project_streak_days: project.project_streak_days,
      created_at: project.created_at,
      updated_at: project.updated_at,
    }))

    return prosessedData
  } catch {
    return null
  }
}

async function getStoredProjectsData(): Promise<ProjectData[] | null> {
  try {
    const projectsData = await AsyncStorage.getItem(STORAGE_KEYS.projects)
  
    if (!projectsData) return null
  
    const parsedData: ProjectData[] = JSON.parse(projectsData)
  
    return parsedData
  } catch {
    return null
  }
}

async function storeProjectsData(projectsData: ProjectData[]): Promise<boolean> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projectsData))

    return true
  } catch {
    return false
  }
}

