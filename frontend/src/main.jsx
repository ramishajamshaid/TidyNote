import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Home from './pages/Home.jsx'
import DashboardLayout from './layout/DashboardLayout.jsx'
import AllNotes from './pages/AllNotes.jsx'
import Favourites from './pages/Favourites.jsx'
import Todos from './pages/Todos.jsx'
import Completed from './pages/Completed.jsx'
import Trash from './pages/Trash.jsx'
import Settings from './pages/Settings.jsx'
import Support from './pages/Support.jsx'
import NoteDetail from './pages/NoteDetail.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index path='' element={<Home />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='dashboard' element={<DashboardLayout/>}>
        <Route index element={<AllNotes/>}/>
        <Route path='favourites' element={<Favourites/>}/>
        <Route path='todos' element={<Todos/>}/>
        <Route path='completed' element={<Completed/>}/>
        <Route path='trash' element={<Trash/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='support' element={<Support/>}/>

        <Route path='detail-page/:id' element={<NoteDetail/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
