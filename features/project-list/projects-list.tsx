import LoadingSpinner from "@/components/loadingSpinner"
import MacondoButton from "@/components/ui/button"
import { useDataCtx } from "@/context/data-context-provider"
import { View } from "react-native"
import ProjectCard from "./project-card"

export default function ProjectsList() {
  const { projects, loadingProjects, updateProjects } = useDataCtx()

  return (
    <>
      {
        projects && !loadingProjects ?
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
          <View style={{ padding: 16 }}>
            <LoadingSpinner />
          </View>
      }
      <View style={{ padding: 16 }}>
        <MacondoButton
          title="Reload"
          disable={loadingProjects}
          type="s"
          onClick={() => updateProjects()}
        />
      </View>
    </>
  )
}