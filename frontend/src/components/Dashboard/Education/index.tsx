import formatDate from "../../../utils/formtDate";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { deleteEducationAsync } from "../../../slices/profileSlice";

const Education = () => {
  const { profile } = useAppSelector((state) => state.profileState);
  const dispatch = useAppDispatch();

  const { education } = profile;

  const educations = education?.map((edu: any) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </td>
      <td>
        <button
          onClick={() => {
            dispatch(deleteEducationAsync(edu._id));
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
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;
