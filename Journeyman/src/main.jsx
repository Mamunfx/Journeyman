import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Basic_Home from './Layouts/Basic_Home';
import Login from './Layouts/Login';
import Register from './Layouts/Register';
import Home from './Layouts/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Basic_Home></Basic_Home>,
    children:[
      {
        element: <Home></Home>,
        path:"",
      },
      {
        element: <Login></Login>,
        path:"/login"
      },
      {
        element: <Register></Register>,
        path:"/Register"
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
