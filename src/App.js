import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./AuthContext/Context";
import  AuthGaurd  from './PrivateRoute/AuthGaurd';

import { ToastContainer } from "react-toastify";

import Menu from "./components/default/menu";
import Home from "./components/default/home";
import SignUp from "./components/auth/signup";
import SignIn from "./components/auth/signin";
import Category from "./components/default/category";
import Single from "./components/default/single";
import Pnf from "./components/util/pnf";

import AdminHome from "./components/admin/adminHome";
import UserHome from "./components/user/UserHome";

function App() {
  const context = useContext(AuthContext)
  const token = context.token
  const isUser = context.isUser
  const isAdmin = context.isAdmin
  return (
    <BrowserRouter>
          <Menu/>
          <ToastContainer autoClose={4000} position={'top-right'} />
          <Routes>
                <Route element={<AuthGaurd/>} >
                    <Route path={`/`} element={<Home/>} />
                    {
                        isAdmin && token ? (
                          <React.Fragment>
                                  <Route path={`/admin/home`} element={<AdminHome/>} />
                          </React.Fragment>
                        ) : null
                     }
                    {
                        isUser && token ? (
                          <React.Fragment>
                                  <Route path={`/user/home`} element={<UserHome/>} />
                          </React.Fragment>
                        ) : null
                    }

                </Route>

                
                <Route path={`/login`} element={<SignIn/>} />
                <Route path={`/register`} element={<SignUp/>} />
                <Route path={`/category/:name`} element={<Category/>} />
                <Route path={`/single/:id`} element={<Single/>} />
                <Route path={`/*`} element={<Pnf/>} />
          </Routes>
    </BrowserRouter>
  )
}

export default App