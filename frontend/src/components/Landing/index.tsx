import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/configureStore";

const Landing = () => {
  const { isAuthenticated } = useAppSelector(
    (state) => state.authenticationState
  );

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing__inner">
          <h1 className="x-large">Developer Portal</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
