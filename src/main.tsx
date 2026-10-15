import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/globals.css'
import { applyGuiTheme, readGuiTheme } from '@/lib/gui-theme'
import { SiteLayout } from './components/layout/SiteLayout'

applyGuiTheme(readGuiTheme())
import { Home } from './routes/Home'
import { Project } from './routes/Project'
import { NotFound } from './routes/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'projects/:slug',
        element: <Project />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
