import { fetchPlans } from "./fetchPlans";

export async function findChildrenOfPlans(id: number) {
  const response = await fetchPlans({id})
  const plans = response.data.data.filter(plan => plan.parentPlanoConta?.id === id)
  return plans
}