import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SlotList from './components/SlotList'
import MasterList from './components/MasterList'

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from './components/Home'
import AdminPanel from './components/AdminPanel'
import Nav from './components/Nav'

const Root = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <footer>copyright 2024</footer>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: <MasterList />,
      },
      {
        path: "/admin",
        element: <AdminPanel />,
      },
    ],
  },
]);

function App() {
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log(REACT_APP_BASE_URL);
  


  return (

    <div className="App">
      <h1>Welcome to Style_Scheduler</h1>
      <RouterProvider router={router}/>
    </div>

  )
}

export default App
