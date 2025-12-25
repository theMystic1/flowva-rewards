// app/dashboard/redirect-to-reward.tsx
import { redirect } from "react-router";

export async function loader() {
  throw redirect("/reward");
}

// Must export a component (can render nothing)
export default function RedirectToReward() {
  return null;
}
