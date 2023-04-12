import React from "react";
import { Link } from "react-router-dom";
import { authFailOrLogout } from "../../slices/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector(
    (state) => state.authenticationState
  );

  const handleLogout = async () => {
    await dispatch(authFailOrLogout());
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={() => handleLogout()} href="/">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
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
          <i className="fas fa-code"></i> Dev Portal{" "}
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

export default Navbar;
