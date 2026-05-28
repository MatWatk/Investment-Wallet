import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.tsx'

function App() {

  return (
    <div className="min-h-screen w-full">
    <RouterProvider router={router} />
    </div>
  )
}

export default App
