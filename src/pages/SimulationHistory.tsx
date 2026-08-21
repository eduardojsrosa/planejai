import { CardSimulation } from "@/components/features/SimulationHistory/CardSimulation"
import type { SimulationRecord } from "@/data/simulation"
import { useSimulationStorage } from "@/hooks/useSimulationStorage"
import { useState } from "react"

export function SimulationHistory() {
  const { getSimulations, deleteSimulation } = useSimulationStorage()
  
  const [simulations, setSimulations] = useState<SimulationRecord[]>(() => getSimulations())
  
  function handleDelete(id: string) {
    deleteSimulation(id)

    setSimulations((current) =>
      current.filter((simulation) => simulation.id !== id),
    )
  }

  if (simulations.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl font-bold text-foreground">
          Histórico de Simulações
        </h1>

        <p className="mt-2 text-muted-foreground">
          Nenhuma simulação encontrada.
        </p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <header className="mb-7">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Histórico de simulações
        </h1>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Acompanhe o histórico de seus planos financeiros.
        </p>
      </header>

      <div className="flex flex-col gap-7">
        {simulations.map((record) => (
          <CardSimulation
            key={record.id}
            record={record}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  )
}