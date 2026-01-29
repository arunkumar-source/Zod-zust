import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import {Input} from "../ui/input"

import { useForm } from "react-hook-form"
import {useWorkState}  from "@/store/userStore"
import {type Work} from "@/Schema/validateSchema"

export function EditWorkSheet({
  work,
  children,
}: {
  work: Work
  children: React.ReactNode
}) {
  const updateWork = useWorkState((s) => s.updatework)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: work.title,
      status: work.status,
    },
  })

  const onSubmit = handleSubmit((data) => {
    updateWork(work.id, data)
  })

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="space-y-4">
        <h3 className="font-semibold text-lg">Edit Work</h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input {...register("title")} />

          <select
            {...register("status")}
            className="w-full border rounded-md p-2"
          >
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <Button type="submit">Save</Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}