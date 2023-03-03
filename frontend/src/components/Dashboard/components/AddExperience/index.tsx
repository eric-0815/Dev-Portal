import React, {useState} from 'react'

import { Link, useNavigate } from "react-router-dom";
import { addExperienceAsync } from '../../../../slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/configureStore';

const AddExperience = () =>{
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.profileState);
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  // const [toDateDisabled, toogleDisabled] = useState(false);
  
  const { company, title, location, from, to, current, description } = formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addExperienceAsync(formData));
          if (!loading && !error) navigate("/dashboard");
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
              onChange={() => {
                setFormData({ ...formData, current: !current });
              }}
            />{' '}
            Current Job
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
            placeholder="Job Description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)} 
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddExperience