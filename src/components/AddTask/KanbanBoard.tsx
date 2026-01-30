import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import { useWorkStore } from "@/store/userStore"
import { KanbanColumn } from "./KanbanColoumn"
import { useEffect } from "react"



const COLUMNS = [
  { id: "todo", title: "Todo" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
] as const

export function KanbanBoard() {
  const { works, error, loading, updateWork, loadWorks } = useWorkStore()

  useEffect(() => {
    loadWorks()
  }, [loadWorks])

  const onDragEnd = async(result: DropResult) => {
    if (!result.destination) return

    await updateWork(result.draggableId, {
      status: result.destination.droppableId as any,
    })
  }

  if (loading) {
    return (
      <div className="text-center p-8">
        <p>Loading Kanban Board...</p>
        <p className="text-sm text-gray-500 mt-2">If this message persists, there might be an issue with the components.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Refresh
        </button>
      </div>
    )
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
