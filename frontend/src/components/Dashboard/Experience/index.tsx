import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import {
  deleteExperienceAsync,
} from "../../../slices/profileSlice";
//import { deleteExperience } from '../../actions/profile';
import formatDate from "../../../utils/formatDate";

const Experience = () => {
  const dispatch = useAppDispatch();

  const { experience } = useAppSelector((state) => state.profileState.profile);

  const experiences = experience?.map((exp: any) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
      </td>
      <td>
        <button
          onClick={() => {
            dispatch(deleteExperienceAsync(exp._id));
          }}
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

export default Experience;
