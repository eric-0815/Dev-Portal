import React, { useEffect } from "react";
import { getProfilesAsync } from "../../slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import Spinner from "../Spinner";
import ProfileItem from "./components/ProfileItem";

const Profiles = () => {
  const dispatch = useAppDispatch();

  const { profiles, loading } = useAppSelector((state) => state.profileState);

  useEffect(() => {
    dispatch(getProfilesAsync());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile: any) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profiles;
