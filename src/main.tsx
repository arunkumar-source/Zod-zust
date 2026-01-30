import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();

// Error boundary to catch rendering errors
class ErrorBoundary extends Error {
  constructor() {
    super('React rendering failed')
    this.name = 'ReactError'
  }
}

// Render the app
console.log('Looking for root element...')
const rootElement = document.getElementById('app')
console.log('Root element found:', rootElement)

if (rootElement) {
  console.log('Creating React root...')
  try {
    const root = ReactDOM.createRoot(rootElement)
    console.log('React root created, rendering app...')
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>,
    )
    console.log('App rendered successfully')
  } catch (error) {
    console.error('Error rendering React app:', error)
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red;">
        <h1>React Error</h1>
        <p>Failed to render React app: ${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `
  }
} else {
  console.error('Root element #app not found!')
  document.body.innerHTML = `
    <div style="padding: 20px; color: red;">
      <h1>DOM Error</h1>
      <p>Root element #app not found in DOM</p>
    </div>
  `
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
