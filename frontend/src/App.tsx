import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Authentication/components/Contact";
import Login from "./components/Authentication/components/Login";
import Register from "./components/Authentication/components/Register";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import { useAppDispatch } from "./store/configureStore";
import { loadUserAsync } from "./slices/authenticationSlice";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

if (localStorage.token) setAuthToken(localStorage.token)


const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserAsync());
  }, [dispatch])

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Alert />
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes> 
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
