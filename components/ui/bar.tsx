import { COLORS } from "@/consts"
import Slider from "@react-native-community/slider"

interface Props {
  min: number
  max: number
  steps: number
  onChange: ((v: number) => void) 
}

export default function MacondoBar({ max, min, onChange, steps }: Props) {
  return (
    <Slider
      minimumValue={min}
      maximumValue={max}
      step={steps}
      minimumTrackTintColor={COLORS.p_color}
      maximumTrackTintColor={COLORS.p_color}
      thumbTintColor={COLORS.p_color}
      onValueChange={onChange}
    />
  )
}