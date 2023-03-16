import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../store/configureStore";

interface ProfileItemType {
  user: { _id: string; name: string; avatar: string };
  status: string;
  company: string;
  location: string;
  skills: String[];
}

interface ProfileItemProp {
  key: string;
  profile: ProfileItemType;
}

const ProfileItem = ({ key, profile }: ProfileItemProp) => {
  const { user, status, company, location, skills } = profile;
  const { isAuthenticated } = useAppSelector(
    (state) => state.authenticationState
  );
  return (
    <div className="profile bg-light">
      <img src={user?.avatar} alt="" className="round-img" />
      <div>
        <h2>{user?.name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        {isAuthenticated ? (
          <Link to={`/profile/${user?._id}`} className="btn btn-primary">
            View Profile
          </Link>
        ) : (
          <Link to={`/login`} className="btn btn-primary">
            Login to see the profile
          </Link>
        )}
      </div>
      <ul>
        {skills?.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
