
import {RouterProvider,createBrowserRouter } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth'
import RedirectLink from './pages/redirect.link'
import AppLayout from './Layouts/app-layout'
import LandingPage from './pages/landing'
import Link from './pages/link'

const router = createBrowserRouter ([
  {
    element:<AppLayout/>,
    children:[
      {path:'/',element:<LandingPage/>},
      {path:'/dashboard',element:<Dashboard/>},
      {path:'/auth',element:<Auth/>},
      {path:'/link/:id',element:<Link/>},
      {path:'/:id',element:<RedirectLink/>},

    ]

  }

])
function App() {
  return <RouterProvider router={router}/>
}

export default App
