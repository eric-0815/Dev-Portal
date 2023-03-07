import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addEducationAsync } from "../../../../../slices/profileSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../store/configureStore";

const AddEducation = () => {
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.profileState);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { school, degree, fieldofstudy, from, to, description, current } =
    formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any school or bootcamp that you
        have attended
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addEducationAsync(formData));
          if (!loading && !error) navigate("/dashboard");
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              // @ts-ignore
              value={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            />{" "}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            disabled={current}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols={30}
            rows={5}
            placeholder="Program Description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onChange(e)
            }
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};
export default AddEducation;
