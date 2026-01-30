import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type Work } from "@/store/userStore"
import { useWorkState } from "@/store/userStore"

export function WorkCard({ work, index }: { work: Work; index: number }) {
  const { deleteWork } = useWorkState()

  return (
    <Draggable draggableId={work.id} index={index}>
      {(p) => (
        <div
          ref={p.innerRef}
          {...p.draggableProps}
          className="mb-2"
        >
          {/* drag handle ONLY here */}
          <div {...p.dragHandleProps}>
            <Card className="p-3">
              <div className="flex justify-between items-center">
                <span>{work.title}</span>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteWork(work.id)
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </Draggable>
  )
}
