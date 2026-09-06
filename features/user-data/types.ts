export const STORAGE_KEYS = {
  profile: "profile",
  projects: "project",
  activeCalendar: "active-calendar"
} 

export interface ProfileData {
  username: string
  image: string
  created_at: string
  timezome: string
  locale: string
  onBoarding_step: string
  steak_freezes: number
  worked_today: boolean
  longest_current_streak: number
  reminder_local_hours: number[]
}

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

export interface ActiveCalendarData {
  month: string
  timezone: string
  days: DayData[]
}

export interface DayData {
  day: string
  status: "active" | "pending" | "frozen"
  seconds_logged: number
  had_journal: boolean
}

