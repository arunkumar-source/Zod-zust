import { Outlet,createFileRoute } from '@tanstack/react-router'
import AddWork from '@/components/AddTask/AddWork'
import { useState } from 'react' 
//kanban
import { KanbanBoard } from "@/components/AddTask/KanbanBoard";


export const Route = createFileRoute('/_pathLessLayout/AddWorkKanban')({
  component: RouteComponent,
  errorComponent: ErrorBoundary,
})

function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button 
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}

function RouteComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false) 
  console.log("RouteComponent rendering") // Debug log
  
  return <div className='text-end m-5 '>
    <h1 className='text-center mt-4 text-4xl font-semibold font-mono'>Track your work Here!</h1>
    <h1 className='text-center m-1 text-2xl font-semibold font-mono'>Manage statuse of your Works without Notbook or pen📝</h1>
    <AddWork open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
    <div className='border border-black p-4 mt-9 rounded-2xl'>
      <div className="p-4 text-center">
        <p>Loading Kanban Board...</p>
        <p className="text-sm text-gray-500 mt-2">If this message persists, there might be an issue with the components.</p>
      </div>
      <KanbanBoard />
    </div>
    <Outlet />
  </div>
}
