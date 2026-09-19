import { createChartPreset } from "react-native-chart-kit/v2"; 
import { COLORS } from "@/consts";

export const CHART_STYLES = createChartPreset({
  light: {
    grid: COLORS.p_color,
    background: COLORS.bg_card_color,
    plotBackground: COLORS.bg_card_color,
    series: [COLORS.p_color, "#ffe600", "#fd0000", "#0011ff"],
    text: COLORS.p_color,
    axis: COLORS.s_color
  }
})