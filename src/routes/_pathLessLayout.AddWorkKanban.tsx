import { Outlet,createFileRoute } from '@tanstack/react-router'
import AddWork from '@/components/AddTask/AddWork'
import { useState } from 'react' 
//kanban
import { KanbanBoard } from "@/components/AddTask/KanbanBoard";


export const Route = createFileRoute('/_pathLessLayout/AddWorkKanban')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false) 
  return <div className='text-end m-5 '>
    <h1 className='text-center mt-4 text-4xl font-semibold font-mono'>Track your work Here!</h1>
    <h1 className='text-center m-1 text-2xl font-semibold font-mono'>Manage statuse of your Works without Notbook or pen📝</h1>
    <AddWork open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
    <div className='border border-black p-4 mt-9 rounded-2xl'>
      <KanbanBoard />
    </div>
    <Outlet />
  </div>
}
