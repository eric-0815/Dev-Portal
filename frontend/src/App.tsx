import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Authentication/components/Contact";
import Login from "./components/Authentication/components/Login";
import Register from "./components/Authentication/components/Register";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import "./App.css";
import Alert from "./components/Alert";

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Alert />
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
      </Routes> 
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
