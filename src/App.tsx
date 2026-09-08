import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  )
}

export default App
