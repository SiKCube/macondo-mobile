import { Text, View } from "react-native"
import ProjectCard from "./project-card"
import { useStoredProjects } from "../user-data/hooks/useStoredProjects"

export default function ProjectsList() {
  const projects = useStoredProjects()

  return (
    <>
      {
        projects ?
          projects.map((prj) => (
            <ProjectCard
              id={prj.id}
              name={prj.name}
              type={prj.type}
              project_streak_days={prj.project_streak_days}
              hackatime_hours_sum={prj.hackatime_hours_sum}
              level={prj.level}
              last_worked_date={prj.last_worked_date}
              key={prj.id}
            />
          ))
          :
          <Text>None</Text>
      }
      <View style={{ height: 15 }} />
    </>
  )
}