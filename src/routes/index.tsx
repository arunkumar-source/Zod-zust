import { createFileRoute } from '@tanstack/react-router'
import AddWork from '../components/AddWork'
export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <h1 className="text-5xl font-semibold text-center m-3 italic">What are you working on?</h1>
      <h2 className="text-3xl text-center text-gray-600 mb-10">Track your Work and stay productive</h2>
      <AddWork />
    </div>
  )
}
