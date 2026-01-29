// src/features/works/components/kanban-column.tsx
import { Droppable } from "@hello-pangea/dnd"
import { Card } from "@/components/ui/card"
import { type Work } from "@/Schema/validateSchema"
import { WorkCard } from "@/components/AddTask/WorkCard"

interface Props {
  title: string
  status: string
  works: Work[]
}

export function KanbanColumn({ title, status, works }: Props) {
  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">{title}</h2>

      <Droppable droppableId={status}>
        {(p) => (
          <div
            ref={p.innerRef}
            {...p.droppableProps}
            className="space-y-3 min-h-[300px]"
          >
            {works.map((work, index) => (
              <WorkCard key={work.id} work={work} index={index} />
            ))}
            {p.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  )
}
