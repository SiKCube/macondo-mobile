export function goldByHours(streak_days: number, level: "1" | "2" | "3" | "4", hours: number): number {
  let goldForLevel = 0
  switch (level) {
    case "1":
      goldForLevel = 40
      break
    case "2":
      goldForLevel = 45
      break
    case "3":
      goldForLevel = 50
      break
    case "4":
      goldForLevel = 60
      break
  }


  const goldByHours = hours * goldForLevel

  const streakBonus = ((goldByHours * streak_days) / 100)

  return Math.round(goldByHours + streakBonus)
}
