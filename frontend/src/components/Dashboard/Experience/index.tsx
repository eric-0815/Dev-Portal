import React, { useEffect }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { getCurrentProfileAsync } from '../../../slices/profileSlice';
//import { deleteExperience } from '../../actions/profile';
import formatDate from '../../../utils/formtDate';

const Experience = () => {
 // const dispatch = useAppDispatch();
  
  const { profile } = useAppSelector((state) => state.profileState);
  
  // const { _id } = useAppSelector((state) => state.authenticationState.user);
  // const { loading, error } = useAppSelector((state) => state.profileState);
  
  // useEffect(() => {
  //   // if there is no profile, attempt to fetch one
  //   if (!profile) dispatch(getCurrentProfileAsync(_id));
  // }, [dispatch, profile, _id]);

  const {experience} = profile

  const experiences = experience.map((exp: any) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
      </td>
      <td>
        <button
          onClick={() => console.log('deleteExperience')/*deleteExperience(exp._id)*/}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

export default (Experience);