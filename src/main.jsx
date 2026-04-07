import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './Layout/MainLayout';
import Homepage from './pages/homepage/Homepage';
import Books from './books/Books';
import {router} from "./routes/Routes"
import { RouterProvider } from 'react-router';



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />,
  </StrictMode>,
)
