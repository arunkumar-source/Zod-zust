import { createFileRoute } from '@tanstack/react-router'
import AddWork from '../components/AddWork'
export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center m-3 italic">What are you working on?</h1>
      <h2 className="text-lg text-center text-gray-600 m-3">Track your time and stay productive</h2>
      <AddWork />
    </div>
  )
}
