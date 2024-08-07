

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";

import Login from './pages/Login';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
 
 import classes from "./app.module.css"
import { useContext, useEffect } from 'react';
import { useAuth } from './util/context/AuthContext';
import People from './pages/People';
import Schools from './pages/Schools';
import Users from './pages/Users';
function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const queryClient = new QueryClient();
  const authCtx = useAuth();
  const getUser = authCtx.fetchUser;
  const user = authCtx.user;
 
/*
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
*/
  const router = createBrowserRouter([
    {  
      path: "/",
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: <Home/>
        
        },
        {
          path: "/people",
          element: <People/>
        
        },
        {
          path: "/schools",
          element: <Schools/>
        
        },
        {
          path: "/users",
          element: <Users/>
        
        },
      ]
    },
    {
      path: "/login",
      element: <Login/>
    }
    ]);

    const navigate = router.navigate;
    useEffect(() => {
      const authToken = localStorage.getItem("token");
 
      if (!authToken) {
        // Redirect to the login page if the token is not present
        
        navigate("/login");
      } else{
        /*
        async function fetchingUser(){
          await getUser();
          }
          fetchingUser()*/
    
      }
      
    }, []);
  
  function Layout(): JSX.Element{
    return(
      <div className={classes["main-container"]}>
        <Navbar/>
        <div style={{position:"relative", flex:1, alignItems: "center", alignContent: "center", height:"100%"}}>
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
