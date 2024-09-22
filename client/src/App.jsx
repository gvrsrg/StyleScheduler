import './App.css'
import MasterList from './components/MasterList'
import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Routes, Route } from "react-router-dom";
//import Home from './components/Home'
import AdminPanel from './components/AdminPanel'
import Nav from './components/Nav'
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import Home from "./components/Home";
import LoginRegister from "./components/LoginRegister";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Auth from "./auth/Auth";

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
        element: <Home title="Style_Scheduler"/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/user",
        element: 
        <RequireAuth>
          <MasterList />
        </RequireAuth>
      },
      {
        path: "/admin",
        element: 
          <RequireAuth>
            <AdminPanel />
          </RequireAuth>
        ,
      },
    ],
  },
]);

function App() {
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  //console.log(REACT_APP_BASE_URL);
  


  return (

    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<LoginRegister title={"Login"} />} />
        <Route path='/signup' element={<LoginRegister title={"Register"} />} />
        <Route
          path='/dash'
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
      </Routes>


      <h1>Welcome to Style_Scheduler</h1>
      {/* <RouterProvider router={router}/> */}
    </div>

  )
}

export default App
