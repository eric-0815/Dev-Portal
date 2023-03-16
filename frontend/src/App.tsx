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
import AddExperience from "./components/Dashboard/components/DashboardActions/AddExperience";
import AddEducation from "./components/Dashboard/components/DashboardActions/AddEducation";
import { removeAllAlerts } from "./slices/alertSlice";
import Profiles from "./components/Profiles";
import Posts from "./components/Posts";
import Post from "./components/Posts/components/Post";
import Profile from "./components/Profiles/components/Profile";

import "./App.scss";

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(
    (state) => state.authenticationState
  );

  const { alerts } = useAppSelector((state) => state.alertState);

  useEffect(() => {
    // if (alerts.length > 0) dispatch(removeAllAlerts());

    if (localStorage.token) setAuthToken(localStorage.token);
    if (isAuthenticated) dispatch(loadUserAsync());
  }, [dispatch, isAuthenticated, alerts.length]);

  return (
    <div data-testid="app">
      <BrowserRouter>
        <>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<Profile />} />
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
            {isAuthenticated && <Route path="/posts" element={<Posts />} />}
            {isAuthenticated && <Route path="/posts/:id" element={<Post />} />}
            <Route path="/contact" element={<Contact />} />
            {<Route path="*" element={<Landing />} />}
          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
