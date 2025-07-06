import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import AppLayout from './layouts/AppLayout'
import Category from './pages/Category'
import NotFoundPage from './components/NotFoundPage'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Prompts from './pages/prompts'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './auth/ProtectedRoute'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Register />
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Prompts />
      },
      {
        path: "/category/:category",
        element: <Category />
      },
      {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            index: true,
            element: <AdminPanel />,
          },
        ],
      },
    ]
  }
  ,
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-right' />
      </QueryClientProvider>
    </>
  )
}

export default App