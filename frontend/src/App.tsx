import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Authentication/components/Contact";
import Login from "./components/Authentication/components/Login";
import Register from "./components/Authentication/components/Register";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import { useAppDispatch, useAppSelector } from "./store/configureStore";
import { loadUserAsync } from "./slices/authenticationSlice";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/Dashboard";
import CreateOrEditProfile from "./components/Dashboard/components/DashboardActions/CreateOrEditProfile";

import "./App.css";
import AddExperience from "./components/Dashboard/components/DashboardActions/AddExperience";
import AddEducation from "./components/Dashboard/components/DashboardActions/AddEducation";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(
    (state) => state.authenticationState
  );

  useEffect(() => {
    if (isAuthenticated) dispatch(loadUserAsync());
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {isAuthenticated && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          {isAuthenticated && (
            <Route path="/create-profile" element={<CreateOrEditProfile />} />
          )}
          {isAuthenticated && (
            <Route path="/edit-profile" element={<CreateOrEditProfile />} />
          )}
          {isAuthenticated && (
            <Route path="/add-experience" element={<AddExperience />} />
          )}
          {isAuthenticated && (
            <Route path="/add-education" element={<AddEducation />} />
          )}
          <Route path="/contact" element={<Contact />} />

          {/* <Route path="*" element={<p>UNAUTHORIZED: 401!</p>} /> */}
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
