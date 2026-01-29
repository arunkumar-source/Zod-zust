//shadcn/ui
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { Button } from "../ui/button";


//RHF lib
import { useForm } from "react-hook-form"

//zustand store
import { useWorkState } from "@/store/userStore";

export default function AddWork({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const addworkstate = useWorkState((s) => s.addwork)
  const form = useForm<{
    title: string;
    status: "todo" | "inprogress" | "done";
  }>({
    defaultValues: { title: "", status: "todo" }
  })

  const onSubmit = form.handleSubmit((data) => {
    addworkstate(data.title, data.status)
    onOpenChange(false)
    form.reset()
   
  })
  return (
    
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Add Work</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add work here
            <DialogDescription>To add in kanban board add here</DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input {...form.register("title")} placeholder="Title" />

          <select className="m-3" {...form.register("status")}>
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <Button type="submit">Add Work</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
