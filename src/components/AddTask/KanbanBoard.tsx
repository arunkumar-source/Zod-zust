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
    console.log("KanbanBoard mounted, loading works...")
    loadWorks()
  }, [loadWorks])

  const onDragEnd = async(result: DropResult) => {
    console.log("Drag ended:", result)
    
    if (!result.destination) {
      console.log("No destination, dropping outside")
      return
    }

    const { draggableId, destination, source } = result
    
    console.log(`Moving ${draggableId} from ${source.droppableId} to ${destination.droppableId}`)
    
    // Only update if the status actually changed
    if (source.droppableId !== destination.droppableId) {
      try {
        console.log("Updating work status...")
        await updateWork(draggableId, {
          status: destination.droppableId as any,
        })
        console.log("Work status updated successfully")
      } catch (error) {
        console.error('Failed to update work status:', error)
        // You could show a toast notification here
      }
    } else {
      console.log("Same destination, no update needed")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Kanban Board...</p>
          <p className="text-sm text-gray-400 mt-1">Fetching your tasks</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 font-medium mb-2">Failed to load tasks</p>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => loadWorks()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
