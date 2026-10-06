import MacondoCard from "./ui/card";
import MacondoTitle from "./ui/title";

export default function LoadingSpinner() {
  return (
    <MacondoCard>
      <MacondoTitle
        text="Loading..."
        size={15}
      />
    </MacondoCard>
  )
}