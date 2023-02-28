import React, { Fragment, useEffect } from "react";
import {
  getCurrentProfileAsync,
  profileSlice,
} from "../../slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import Spinner from "../Spinner";

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
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user?.name}
      </p>
    </Fragment>
  );
};

export default Dashboard;
