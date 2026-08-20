import { FormStep } from "./FormStep"
import { StepProgress } from "./Progress"

import { simulationFormSteps } from '@/data/simulation'

export const SimulattionForm = () => {
  const currentStep = simulationFormSteps[0]

  return (
    <>
      <StepProgress currentStep={1} totalSteps={5} />
      <FormStep key={currentStep.id} {...currentStep} />
    </>
  )
}