import React, { Fragment, useState, useEffect } from "react";
import { Link, Navigate  } from "react-router-dom";
import { loginAsync } from "../../../../slices/authenticationSlice";
import { getCurrentProfileAsync } from "../../../../slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/configureStore";

const Login = () => {
  const dispatch = useAppDispatch();

  const authenticationState = useAppSelector((state) => state.authenticationState);

  const {isAuthenticated} = authenticationState
  const userId = authenticationState.user?._id

  useEffect(() => {
    dispatch(getCurrentProfileAsync(userId))
  }, [])
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const loginInfo = {
      email,
      password,
    };
    try {
      await dispatch(loginAsync(loginInfo));
      // Redirect if logged in
    } catch (error) {
      console.log(error);
    }
  };
  
  if (isAuthenticated) return <Navigate to = "/dashboard" />
  
  return (
    <Fragment>
      <div className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmit(event)}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            required
            minLength={6}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      </div>
    </Fragment>
  );
};

export default Login;
