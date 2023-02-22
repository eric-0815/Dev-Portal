import React, {Fragment} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Authentication/components/Login';
import Register from './components/Authentication/components/Register';
import Landing from './components/Landing';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
      <Navbar />
      <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
      </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
