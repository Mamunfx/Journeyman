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
import AuthProvider from './Context/AuthProvider';
import ErrorPage from './Components/ErrorPage';
import Dashboard from './Layouts/Dashboard';

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
  {
    element: <Dashboard></Dashboard>,
    path:"/dashboard",
  },
  {
    element:<ErrorPage></ErrorPage>,
    path:"*"
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
