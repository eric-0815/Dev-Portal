import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { deleteAccountAsync, getProfileAsync } from "../../slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import handleError from "../../utils/handleError";
import Spinner from "../Spinner";
import DashboardActions from "./components/DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authenticationState = useAppSelector(
    (state) => state.authenticationState
  );

  const { profile, loading } = useAppSelector((state) => state.profileState);

  const isAuthenticated = authenticationState.isAuthenticated;
  const user = authenticationState.user;
  const userId = user?._id;

  useEffect(() => {
    if (userId) dispatch(getProfileAsync(userId));
  }, [dispatch, userId]);

  const handleDeleteAccount = () => {
    dispatch(deleteAccountAsync());
    navigate("/");
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      {profile === null && !isAuthenticated && <Navigate to="/" />}
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user?.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience />
          <Education />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDeleteAccount();
              }}
            >
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
