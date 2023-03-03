import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentProfileAsync } from "../../slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import Spinner from "../Spinner";
import DashboardActions from "./components/DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const authenticationState = useAppSelector(
    (state) => state.authenticationState
  );

  const { profile, loading } = useAppSelector((state) => state.profileState);

  const user = authenticationState.user;
  const userId = user?._id;

  useEffect(() => {
    if (userId) dispatch(getCurrentProfileAsync(userId));
  }, [dispatch, userId]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user?.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience />
          <Education />
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
