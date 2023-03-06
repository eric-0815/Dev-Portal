import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfileAsync } from "../../../slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import Spinner from "../../Spinner";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
import ProfileTop from "./ProfileTop";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.profileState);
  const { isAuthenticated, loading, user } = useAppSelector(
    (state) => state.authenticationState
  );
  const authUserId = user._id;

  useEffect(() => {
    if (id) dispatch(getProfileAsync(id));
  }, [dispatch, id]);

  return (
    <section className="container">
      {profile === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {isAuthenticated &&
            loading === false &&
            authUserId === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience: any) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education: any) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {/* {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )} */}
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
