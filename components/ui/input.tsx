import { COLORS } from "@/consts"
import { Dispatch } from "react"
import { InputModeOptions, StyleSheet, TextInput } from "react-native"

interface Props {
  placeholder: string
  type: InputModeOptions
  value: string
  disable?: boolean
  setValue: Dispatch<string>
}

export default function MacondoInput({ placeholder, type, value, setValue, disable }: Props) {
  return (
    <TextInput
      style={styles.macondoInput}
      placeholder={placeholder}
      inputMode={type}
      onChangeText={setValue}
      editable={disable ? !disable : true}
      value={value}
    />
  )
}

const styles = StyleSheet.create({
  macondoInput: {
    borderWidth: 4,
    borderColor: COLORS.p_color,
    padding: 12,
    color: COLORS.s_color,
    backgroundColor: COLORS.input_bg,
    outline: "none"
  }
})
