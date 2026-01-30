import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type Work } from "@/Schema/validateSchema"
import { useWorkStore } from "@/store/userStore"
import { EditWorkSheet } from "./editSheet"

export function WorkCard({ work, index }: { work: Work; index: number }) {
  const { deleteWork } = useWorkStore()

  return (
    <Draggable draggableId={work.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`mb-3 transition-all duration-200 ${
            snapshot.isDragging 
              ? 'transform rotate-2 scale-105 shadow-2xl opacity-90' 
              : 'transform hover:scale-102'
          }`}
        >
          <Card 
            className={`p-4 cursor-move transition-all duration-200 ${
              snapshot.isDragging 
                ? 'bg-blue-50 border-blue-300 shadow-lg' 
                : 'hover:shadow-md hover:border-gray-300 bg-white'
            }`}
          >
            <div {...provided.dragHandleProps}>
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-sm leading-tight ${
                    snapshot.isDragging ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {work.title}
                  </h3>
                  {work.createdAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(work.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-1 shrink-0">
                  <EditWorkSheet work={work}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-blue-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Button>
                  </EditWorkSheet>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-50 text-red-500"
                    onClick={() => {
                      deleteWork(work.id)
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  )
}
