import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { authFailOrLogout } from "../../slices/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector(
    (state) => state.authenticationState
  );

  const handleLogout = async () => {
    await dispatch(authFailOrLogout());
    <Navigate to="/login" />;
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={() => handleLogout()} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="#!">Developers</Link>
      </li>
      <li>
        <Link to="register">Register</Link>
      </li>
      <li>
        <Link to="login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevCenter{" "}
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
