import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import { useWorkState } from "@/store/userStore"
import { KanbanColumn } from "./KanbanColoumn"

const COLUMNS = [
  { id: "todo", title: "Todo" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
] as const

export function KanbanBoard() {
  const works = useWorkState((s) => s.works)
  const updateWork = useWorkState((s) => s.updatework)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    updateWork(result.draggableId, {
      status: result.destination.droppableId as any,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            title={col.title}
            status={col.id}
            works={works.filter((w) => w.status === col.id)}
          />
        ))}
      </div>
    </DragDropContext>
  )
}
