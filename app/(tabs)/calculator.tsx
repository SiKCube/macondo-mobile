import GoalForm from "@/features/calculator/goalForm";
import { View, ScrollView } from "react-native";

export default function Calculator() {
  return (
    <ScrollView style={{ padding: 16 }}>
      <GoalForm />
      <View style={{ height: 50 }} />
    </ScrollView>
  )
}