import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  useAppDispatch,
} from "../../../../store/configureStore";

import axios from "axios";
import { setAlert, removeAlert } from "../../../../slices/alertSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
      dispatch(setAlert({msg: 'Password do not match', alertType: 'danger'}))
      setTimeout(() => dispatch(removeAlert()), 5000)
    } else {
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post("/api/users/register", body, config);
        console.log(res.data);
      } catch (err: any) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <Fragment>
      <div className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmit(event)}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            required
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            required
            minLength={6}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      </div>
    </Fragment>
  );
};

export default Register;
