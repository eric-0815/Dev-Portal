import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { authFailOrLogout } from '../../slices/authenticationSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';


const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.authenticationState);

  const authLinks = (
    <ul>
        <li>
          <a onClick={() => dispatch(authFailOrLogout())} href='#!'>
            <i className='fas fa-sign-out-alt'></i>
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
  );

  const guestLinks = (
    <ul>
        <li><Link to="#!">Developers</Link></li>
        <li><Link to="register">Register</Link></li>
        <li><Link to="login">Login</Link></li>
      </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevCenter </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  )
}

export default Navbar
