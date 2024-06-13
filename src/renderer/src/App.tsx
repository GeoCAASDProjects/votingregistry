

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";

import Login from './pages/Login';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
 
 import classes from "./app.module.css"
function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path: "/",
          element:  <Login/>
        }
      ]
    }
  ]);
 
  function Layout(): JSX.Element{
    return(
      <div className={classes["main-container"]}>
        <Navbar/>
        <div style={{position:"relative", flex:1,     alignItems: "center", alignContent: "center"}}>
        <QueryClientProvider client={queryClient}>
          <Outlet/>
        </QueryClientProvider>
        </div>
      </div>
    )
  }
  return (
   
    <RouterProvider router={router}/>
 
  )
}

export default App
