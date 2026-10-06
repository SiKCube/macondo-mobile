import MacondoCard from "@/components/ui/card";
import MacondoTitle from "@/components/ui/title";
import { useDataCtx } from "@/context/data-context-provider";
import { useEffect, useState } from "react";
import { DonutChart } from "react-native-chart-kit/v2";
import { ProjectData } from "../user-data/types";
import LoadingSpinner from "@/components/loadingSpinner";

interface Props {
  width: number
  hegint: number
}

export default function StreakPieChart({ width, hegint }: Props) {
  const { projects, loadingProjects } = useDataCtx()
  const [horasTotal, setHorasTotal] = useState<number>(0)

  useEffect(() => {
    let total = 0

    projects?.forEach((p: ProjectData) => {
      total += p.hackatime_hours_sum
    })

    setHorasTotal(total)
  }, [])

  useEffect(() => {
    let total = 0

    projects?.forEach((p: ProjectData) => {
      total += p.hackatime_hours_sum
    })

    setHorasTotal(total)
  }, [projects])

  return (
    <MacondoCard>
      <MacondoTitle text="Hours by project" size={25} />
      {
        projects && !loadingProjects ?
          <DonutChart
            data={projects as any}
            centerLabel={String(horasTotal.toFixed(2) + "h")}
            valueKey="hackatime_hours_sum"
            labelKey="name"
            width={width}
            height={hegint}
            sliceSeparator={{ width: 5 }}
            legend={{
              itemGap: 8,
              maxItemWidth: "100%",
            }}
          />
          :
          <LoadingSpinner />
      }
    </MacondoCard>
  )
}