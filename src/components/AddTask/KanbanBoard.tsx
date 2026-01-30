import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import { useWorkState } from "@/store/userStore"
import { KanbanColumn } from "./KanbanColoumn"
import { useEffect, useState } from "react"



const COLUMNS = [
  { id: "todo", title: "Todo" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
] as const

export function KanbanBoard() {
  const { works, loadWorks, updateWork } = useWorkState()
  const [error, setError] = useState<string | null>(null)
  

  
  useEffect(() => {
    const loadData = async () => {
      try {
        await loadWorks()
      } catch (err) {
        console.error("Failed to load works:", err)
        setError("Failed to load data. Please refresh the page.")
      }
    }
    loadData()
  }, [])


  const onDragEnd = async(result: DropResult) => {
    if (!result.destination) return

    await updateWork(result.draggableId, {
      status: result.destination.droppableId as any,
    })
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
