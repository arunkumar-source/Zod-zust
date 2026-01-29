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
    const deletework = useWorkState((s) => s.deletework)
  return (
    <Draggable draggableId={work.id} index={index}>
      {(p) => (
        <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
          <EditWorkSheet work={work}>
            <Card className="p-3 cursor-pointer hover:bg-muted">
              <div>{work.title}</div>
              <Button onClick={() => deletework(work.id)}>Delete</Button>
            </Card>
          </EditWorkSheet>
        </div>
      )}
    </Draggable>
  )
}
