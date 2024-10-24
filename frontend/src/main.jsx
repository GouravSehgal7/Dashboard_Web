import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dash_Real_anal from './pages/Dash_Real_anal.jsx';
import Dash_graphical from './pages/Dash_graphical.jsx';
import Dash_details from './pages/Dash_details.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App/>
    ),
  },
  {
    path: "dashboard/real-analysis",
    element: <Dash_Real_anal/>,
  },
  {
    path: "dashboard/graphical",
    element: <Dash_graphical/>
  },
  {
    path: "dashboard/details",
    element: <Dash_details/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "signup",
    element: <Signup/>
    
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
