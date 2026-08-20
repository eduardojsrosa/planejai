import { PiggyBank } from "lucide-react"
import { FormStep } from "./FormStep"
import { StepProgress } from "./Progress"

export const SimulattionForm = () => {
  return (
    <>
      <StepProgress currentStep={1} totalSteps={5} />
      <FormStep 
        icon={PiggyBank}
        title="Renda mensal bruta"
        question="Quanto é depositado na sua conta todo mês?" 
        inputProps={{
          type: "text",
          placeholder: "5.000,00",
          prefix: "R$",
        }}      
      />
    </>
  )
}