import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Restraunts from './components/Restraunts/Restraunts.jsx'
import Dishes from './components/Dishes/Dishes.jsx'
import Layout from './Layout.jsx'
import Chatbot from './components/Chatbot/Chatbot.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
    <Route path='' element={<Home/>}/> 
      <Route path='/restraunts' element={<Restraunts/>}/>
      <Route path='/dishes' element={<Dishes/>}/>
      <Route path="/recommend" element={<Chatbot />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
