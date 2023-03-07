import React, { useEffect, useState } from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import {
  createOrUpdateProfileAsync,
  getProfileAsync,
} from "../../../../../slices/profileSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../store/configureStore";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

const CreateOrEditProfile = () => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useMatch("/create-profile");

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authenticationState);
  const userId = user?._id;

  const { profile } = useAppSelector((state) => state.profileState);
  const { loading, error } = useAppSelector((state) => state.profileState);
  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) dispatch(getProfileAsync(userId));

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData = { ...initialState } as any;
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      // set local state with the profileData

      setFormData(profileData);
    }
  }, [dispatch, loading, profile, userId]);

  const navigate = useNavigate();

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      formData,
      isEdit: creatingProfile ? false : true,
    };
    dispatch(createOrUpdateProfileAsync(data));
    if (!loading && !error) navigate("/dashboard");
  };

  return (
    <section className="container">
      <h1 className="large text-primary">
        {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile
          ? ` Let's get some information to make your`
          : " Add some changes to your profile"}
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
      >
        <div className="form__group">
          <select
            name="status"
            value={status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e)}
          >
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form__text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form__group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
          <small className="form__text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form__group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
          <small className="form__text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form__group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
          <small className="form__text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form__group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
          <small className="form__text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form__group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
          <small className="form__text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form__group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onChange(e)
            }
          />
          <small className="form__text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form__group form__social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
              />
            </div>

            <div className="form__group form__social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
              />
            </div>

            <div className="form__group form__social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
              />
            </div>

            <div className="form__group form__social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
              />
            </div>

            <div className="form__group form__social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
              />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default CreateOrEditProfile;
