import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@/components/ui/card"
import { type Work } from "@/Schema/validateSchema"
import { EditWorkSheet } from "./editSheet"
import { useWorkState } from "@/store/userStore"
import { Button } from "../ui/button"
export function WorkCard({
  work,
  index,
}: {
  work: Work
  index: number
}) {
  const { deleteWork } = useWorkState()

  return (
    <Draggable draggableId={work.id} index={index}>
      {(p) => (
        <div ref={p.innerRef} {...p.draggableProps}>
          <Card className="p-3 hover:bg-muted space-y-2">
            
            {/* Drag handle ONLY */}
            <div
              {...p.dragHandleProps}
              className="font-medium cursor-grab"
            >
              {work.title}
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2">
              <EditWorkSheet work={work}>
                <Button variant="outline" size="sm">Edit</Button>
              </EditWorkSheet>
              <Button
                variant="destructive"
                onClick={() => deleteWork(work.id)}
              >
                Delete
              </Button>
            </div>

          </Card>
        </div>
      )}
    </Draggable>
  )
}
