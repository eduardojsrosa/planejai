import { CircleGauge, ExternalLink, Trash2 } from 'lucide-react'

import { Button } from '@/components/shared/Button'
import type { SimulationRecord } from '@/data/simulation'
import { formatCurrencyMask, parseCurrency } from '@/utils/currency'
import { useNavigate } from 'react-router-dom'

type CardSimulationProps = {
  record: SimulationRecord
  onDelete?: (id: string) => void
  onDetails?: (id: string) => void
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export function CardSimulation({
  record,
  onDelete,
}: CardSimulationProps) {
  const navigate = useNavigate()
  
  const goalAmount = parseCurrency(record.goalAmount)
  const goalDeadline = Number(record.goalDeadline)

  const monthlySaving =
    goalDeadline > 0
      ? Number((goalAmount / goalDeadline).toFixed(2))
      : 0

  const formattedDate = record.createdAt
    ? dateFormatter.format(new Date(record.createdAt))
    : '—'

  return (
    <article className="rounded-3xl border border-border bg-card p-5 shadow-[0_8px_25px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.12)] sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Meta */}
        <div className="flex min-w-0 items-center gap-4 lg:w-[30%]">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted-primary text-primary">
            <CircleGauge className="size-6" strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-foreground sm:text-lg">
              {record.goalName}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Informações */}
        <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-3 lg:gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Custo da meta
            </p>

            <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
              R$ {formatCurrencyMask(goalAmount.toString())}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Prazo
            </p>

            <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
              {goalDeadline} {goalDeadline === 1 ? 'mês' : 'meses'}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Economia mensal
            </p>

            <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
              R$ {formatCurrencyMask(monthlySaving.toString())}
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-end gap-4 border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <Button 
            variant={'ghost'} 
            icon={Trash2} 
            onClick={() => onDelete?.(record.id)}
            className="text-red-500 transition-colors hover:bg-red-500/10"
          />

          <Button 
            variant={'secondary'}
            icon={ExternalLink}
            onClick={() => void navigate('/resultado/' + record.id)}
          >
            <span className="hidden sm:inline">Ver detalhes</span>
          </Button>
        </div>
      </div>
    </article>
  )
}