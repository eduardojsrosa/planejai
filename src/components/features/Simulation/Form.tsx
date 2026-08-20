import { StepProgress } from "./Progress"

export const SimulattionForm = () => {
  return (
    <>
      <StepProgress currentStep={1} totalSteps={5} />
    </>
  )
}