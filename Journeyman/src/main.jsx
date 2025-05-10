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
import PrivateRoute from './Routes/PrivateRoute';
import PrivateForAdmin from "./Routes/PrivateForAdmin"
import PrivateForBuyer from "./Routes/PrivateForBuyer"
import Profile from './Layouts/Profile';
import AdminHome from './Layouts/AdminHome';
import ManageUser from './Layouts/ManageUser'
import ManageTask from './Layouts/ManageTask'
import BuyerHome from './Layouts/BuyerHome'
import  AddNewTask from './Layouts/AddNewTask'
import  MyTasks from './Layouts/MyTasks'
import  AllPayments from './Layouts/AllPayments'
import  PurchaseCoin from './Layouts/PurchaseCoin'
import  WorkerHome from './Layouts/WorkerHome'
import  AllTasks from './Layouts/AllTasks'
import  MySubmissions from './Layouts/MySubmissions'
import  WithDrawls from './Layouts/WithDrawls'


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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    path:"/dashboard",
    children:[
      {
        element:<Profile></Profile>,
        path:""
      },
      {
        element:<PrivateForAdmin><AdminHome></AdminHome></PrivateForAdmin>,
        path:"/dashboard/adminHome"
      },
      {
        element:<PrivateForAdmin><ManageUser></ManageUser></PrivateForAdmin>,
        path:"/dashboard/manageUser"
      },
      {
        element:<PrivateForAdmin><ManageTask></ManageTask></PrivateForAdmin>,
        path:"/dashboard/manageTask"
      },
      {
        element:<PrivateForBuyer><BuyerHome></BuyerHome> </PrivateForBuyer>,
        path:"/dashboard/buyerHome"
      },
      {
        element:<PrivateForBuyer> <AddNewTask></AddNewTask> </PrivateForBuyer>,
        path:"/dashboard/addNewTask"
      },
      {
        element:<PrivateForBuyer> <MyTasks></MyTasks></PrivateForBuyer>,
        path:"/dashboard/myTasks"
      },
      {
        element:<PrivateForBuyer><AllPayments></AllPayments> </PrivateForBuyer>,
        path:"/dashboard/allPayments"
      },
      {
        element:<PrivateForBuyer> <PurchaseCoin></PurchaseCoin> </PrivateForBuyer>,
        path:"/dashboard/purchaseCoin"
      },
      {
        element:<PrivateRoute> <WorkerHome></WorkerHome> </PrivateRoute>,
        path:"/dashboard/workerHome"
      },
      {
        element:<PrivateRoute> <AllTasks></AllTasks> </PrivateRoute>,
        path:"/dashboard/allTasks"
      },
      {
        element:<PrivateRoute> <MySubmissions></MySubmissions> </PrivateRoute>,
        path:"/dashboard/mySubmissions"
      },
      {
        element:<PrivateRoute> <WithDrawls></WithDrawls> </PrivateRoute>,
        path:"/dashboard/withDrawls"
      },
    ]
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
