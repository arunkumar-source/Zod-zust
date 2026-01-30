import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

// Simple test component
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'blue' }}>Test: React is working!</h1>
      <p>If you can see this, React is rendering correctly.</p>
    </div>
  )
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
